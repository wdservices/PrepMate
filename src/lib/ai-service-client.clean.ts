// Client-side AI service with enhanced error handling and caching
import { env } from './env';

type Role = 'user' | 'assistant' | 'system' | 'model';

interface ChatMessage {
  role: Role;
  content: string;
}

interface ExplanationParams {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
  subject: string;
  explanation?: string;
}

interface CachedResponse {
  response: string;
  timestamp: number;
}

interface TranslationParams {
  text: string;
  targetLanguage: string;
}

// Configuration
const CONFIG = {
  API_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
  MODEL_NAME: 'gemini-1.5-pro',
  MAX_RETRIES: 2,
  INITIAL_RETRY_DELAY: 1000, // 1 second
  RATE_LIMIT_DELAY: 5000, // 5 seconds
  CACHE_TTL: 1000 * 60 * 60 * 24, // 24 hours
  MAX_CACHED_EXPLANATIONS: 100,
  RATE_LIMIT_COOLDOWN: 5 * 60 * 1000, // 5 minutes
} as const;

// Error class for rate limiting
export class RateLimitError extends Error {
  retryAfter: number;
  
  constructor(message: string, retryAfter: number) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

// Cache for API responses
const responseCache = new Map<string, CachedResponse>();

// Track rate limiting state
let lastRequestTime = 0;
let isPermanentlyRateLimited = false;

// Load cached explanations from localStorage on initialization
function loadCachedExplanations() {
  if (typeof window === 'undefined') return;
  
  try {
    const cached = localStorage.getItem('aiExplanations');
    if (cached) {
      const parsed = JSON.parse(cached);
      parsed.forEach(([key, data]: [string, CachedResponse]) => {
        responseCache.set(key, data);
      });
    }
  } catch (error) {
    console.error('Failed to load cached explanations:', error);
  }
}

// Initialize cache on client side
if (typeof window !== 'undefined') {
  loadCachedExplanations();
}

// Helper to get the full API URL
function getApiUrl(method: 'generateContent' | 'streamGenerateContent' = 'generateContent'): string {
  return `${CONFIG.API_BASE_URL}/models/${CONFIG.MODEL_NAME}:${method}?key=${env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}`;
}

// Save response to cache with size management
function saveToCache(key: string, response: string): void {
  // Update in-memory cache
  const cacheEntry = {
    response,
    timestamp: Date.now()
  };
  
  // Remove oldest items if cache is full
  if (responseCache.size >= CONFIG.MAX_CACHED_EXPLANATIONS) {
    const oldestKey = responseCache.keys().next().value;
    if (oldestKey) {
      responseCache.delete(oldestKey);
    }
  }
  
  responseCache.set(key, cacheEntry);
  
  // Save to localStorage if available
  if (typeof window !== 'undefined') {
    try {
      const entries = Array.from(responseCache.entries())
        .sort((a, b) => b[1].timestamp - a[1].timestamp) // Most recent first
        .slice(0, CONFIG.MAX_CACHED_EXPLANATIONS);
      
      localStorage.setItem('aiExplanations', JSON.stringify(entries));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }
}

// Check if we're currently rate limited
function checkRateLimit(): number | null {
  if (isPermanentlyRateLimited) {
    return -1; // Permanent rate limit
  }
  
  const timeSinceLastRequest = Date.now() - lastRequestTime;
  if (timeSinceLastRequest < CONFIG.RATE_LIMIT_DELAY) {
    return CONFIG.RATE_LIMIT_DELAY - timeSinceLastRequest;
  }
  
  return null;
}

// Handle rate limiting with exponential backoff
async function handleRateLimit(retryAfter: number, attempt: number): Promise<boolean> {
  if (attempt >= CONFIG.MAX_RETRIES) {
    isPermanentlyRateLimited = true;
    return false;
  }
  
  const delay = Math.min(
    CONFIG.INITIAL_RETRY_DELAY * Math.pow(2, attempt),
    CONFIG.RATE_LIMIT_COOLDOWN
  );
  
  await new Promise(resolve => setTimeout(resolve, delay));
  return true;
}

// Main AI service with improved error handling
export const aiService = {
  // Generate a cache key from parameters
  generateCacheKey(params: Record<string, any>): string {
    return JSON.stringify(
      Object.entries(params)
        .sort()
        .map(([key, value]) => `${key}:${String(value).toLowerCase()}`)
    );
  },
  
  // Generate or retrieve an explanation for a question answer
  async generateExplanation(params: ExplanationParams): Promise<string> {
    const { question, selectedAnswer, isCorrect, correctAnswer, subject, explanation } = params;
    
    // Check cache first
    const cacheKey = this.generateCacheKey({
      type: 'explanation',
      question,
      selectedAnswer,
      isCorrect,
      correctAnswer,
      subject
    });
    
    const cached = responseCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CONFIG.CACHE_TTL)) {
      return cached.response;
    }
    
    // Check rate limiting
    const rateLimitDelay = checkRateLimit();
    if (rateLimitDelay !== null) {
      if (rateLimitDelay === -1) {
        throw new RateLimitError('Rate limit exceeded. Please try again later.', -1);
      }
      await new Promise(resolve => setTimeout(resolve, rateLimitDelay));
    }
    
    try {
      // Make API call to generate explanation
      const response = await fetch(getApiUrl('generateContent'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{
              text: `Explain why ${isCorrect ? 'the selected answer is correct' : 'the selected answer is incorrect and explain the correct answer'} for the following question in ${subject}:\n\nQuestion: ${question}\n\nSelected Answer: ${selectedAnswer}\n${!isCorrect ? `Correct Answer: ${correctAnswer}` : ''}\n\nPlease provide a clear and concise explanation.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });
      
      lastRequestTime = Date.now();
      
      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('Retry-After') || '5', 10) * 1000;
          throw new RateLimitError('Rate limit exceeded', retryAfter);
        }
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const explanationText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                            'No explanation available.';
      
      // Cache the explanation
      saveToCache(cacheKey, explanationText);
      
      return explanationText;
    } catch (error) {
      console.error('Error generating explanation:', error);
      
      // Return a fallback explanation if available
      if (explanation) {
        return explanation;
      }
      
      // Return a generic fallback explanation
      return isCorrect 
        ? `The selected answer is correct.`
        : `The correct answer is: ${correctAnswer}`;
    }
  },
  
  // Chat with the AI model
  async chat(messages: ChatMessage[]): Promise<string> {
    const url = getApiUrl('generateContent');
    const requestBody = {
      contents: messages.map(msg => ({
        role: msg.role === 'system' ? 'user' : msg.role,
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      lastRequestTime = Date.now();

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle rate limiting and quota exceeded
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('retry-after') || '0') * 1000 || CONFIG.RATE_LIMIT_COOLDOWN;
          
          // Check if it's a quota exceeded error (permanent rate limit)
          if (errorData.error?.status === 'RESOURCE_EXHAUSTED' && 
              errorData.error?.message?.includes('quota')) {
            isPermanentlyRateLimited = true;
            throw new RateLimitError(
              'You have exceeded your API quota. Please check your billing details or try again later.',
              -1 // -1 indicates permanent rate limit
            );
          }
          
          // Temporary rate limit
          throw new RateLimitError(
            'Too many requests. Please slow down.',
            retryAfter
          );
        }
        
        throw new Error(JSON.stringify({
          type: 'API_ERROR',
          status: response.status,
          message: errorData.error?.message || 'Failed to generate response',
          details: errorData,
        }));
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';
    } catch (error) {
      console.error('Error in chat:', error);
      if (error instanceof Error) {
        // If it's already a parsed error, rethrow it
        try {
          const parsedError = JSON.parse(error.message);
          throw error;
        } catch (e) {
          // If not a JSON error, wrap it
          throw new Error(JSON.stringify({
            type: 'UNKNOWN_ERROR',
            message: error.message,
            stack: error.stack,
            name: error.name
          }));
        }
      }
      throw new Error(JSON.stringify({
        type: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        error: String(error)
      }));
    }
  },

  // Chat with retry logic
  async chatWithRetry(messages: ChatMessage[], retryCount = 0): Promise<string> {
    try {
      return await this.chat(messages);
    } catch (error) {
      if (error instanceof RateLimitError) {
        if (error.retryAfter === -1) {
          throw error; // Permanent rate limit, don't retry
        }
        
        if (retryCount < CONFIG.MAX_RETRIES) {
          const delay = error.retryAfter || CONFIG.INITIAL_RETRY_DELAY * (2 ** retryCount);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.chatWithRetry(messages, retryCount + 1);
        }
      }
      
      // If we get here, all retries failed or it's a different type of error
      throw error;
    }
  },

  // Translate text
  async translate(params: TranslationParams): Promise<string> {
    const { text, targetLanguage } = params;
    
    // Check cache first
    const cacheKey = this.generateCacheKey({
      type: 'translation',
      text,
      targetLanguage
    });
    
    const cached = responseCache.get(cacheKey);
    if (cached) {
      return cached.response;
    }
    
    // Check rate limiting
    const rateLimitDelay = checkRateLimit();
    if (rateLimitDelay !== null) {
      if (rateLimitDelay === -1) {
        throw new RateLimitError('Rate limit exceeded. Please try again later.', -1);
      }
      await new Promise(resolve => setTimeout(resolve, rateLimitDelay));
    }
    
    try {
      const translatedText = await this.chat([
        {
          role: 'user',
          content: `Translate the following text to ${targetLanguage}. Only respond with the translated text, nothing else.\n\n${text}`
        }
      ]);
      
      // Cache the translation
      saveToCache(cacheKey, translatedText);
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    }
  },

  // Fallback explanation when AI is unavailable
  getFallbackExplanation(params: ExplanationParams): string {
    const { isCorrect, correctAnswer, selectedAnswer, question } = params;
    
    const baseExplanation = isCorrect
      ? `✅ Your answer "${selectedAnswer}" is correct!`
      : `❌ Incorrect. The correct answer is: "${correctAnswer}"`;
    
    // Add educational value
    if (!isCorrect) {
      return `${baseExplanation}\n\nRemember to review this concept: "${question}"`;
    }
    
    return baseExplanation;
  },
};

export default aiService;
