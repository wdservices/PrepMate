import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { env } from './env';

// Initialize Genkit with Google AI plugin
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: env.GOOGLE_API_KEY || '',
    }),
  ],
});

// Default model to use for generation
const DEFAULT_MODEL = 'googleai/gemini-pro';

type ExplanationParams = {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
  subject: string;
};

type TranslationParams = {
  text: string;
  targetLanguage: string;
};

type ChatMessage = {
  role: 'user' | 'model' | 'system';
  content: string;
};

export const aiService = {
  // Generate an explanation for a question answer
  async generateExplanation(params: ExplanationParams): Promise<string> {
    try {
      const { question, selectedAnswer, isCorrect, correctAnswer, subject } = params;
      
      const prompt = `You are a helpful ${subject} tutor. Explain why the selected answer is ${
        isCorrect ? 'correct' : 'incorrect'
      } in a clear, educational way. Be encouraging and provide additional context to help the student understand the concept better.
      
Question: ${question}
Selected Answer: ${selectedAnswer}
Correct Answer: ${correctAnswer}

Explanation:`;

      const response = await ai.generate({
        model: 'googleai/gemini-pro',
        prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 250,
        },
      });

      return response.text() || 'Sorry, I could not generate an explanation at this time.';
    } catch (error) {
      console.error('Error generating explanation:', error);
      return 'An error occurred while generating the explanation. Please try again.';
    }
  },

  // Translate text to target language
  async translateText({ text, targetLanguage }: TranslationParams): Promise<string> {
    try {
      const prompt = `Translate the following text to ${targetLanguage}. Only return the translated text, nothing else.\n\n${text}`;
      
      const response = await ai.generate({
        model: 'googleai/gemini-pro',
        prompt,
        config: {
          temperature: 0.3,
        },
      });

      return response.text() || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  },

  // Chat with the AI assistant
  async chat(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await ai.generate({
        model: 'googleai/gemini-pro',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful study assistant. Provide clear, educational responses to help students understand their questions better.'
          },
          ...messages
        ],
        config: {
          temperature: 0.7,
        },
      });

      return response.text() || 'Sorry, I could not process your message at this time.';
    } catch (error) {
      console.error('Error in chat:', error);
      return 'An error occurred while processing your message. Please try again.';
    }
  },
};
