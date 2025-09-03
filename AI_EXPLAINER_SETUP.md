# AI Explainer Setup Guide

This guide explains how to set up and configure the AI explainer feature in the PrepMate application, which uses Google's Gemini AI to generate explanations for quiz questions.

## Prerequisites

1. A Google Cloud Project with the Vertex AI API enabled
2. A Google API key with access to the Gemini AI models

## Local Development Setup

### 1. Environment Variables

Create a `.env.local` file in the root of your project with the following content:

```env
# Google AI API Key (used server-side)
GOOGLE_API_KEY=your_google_api_key_here

# Client-side Google API Key (exposed to browser)
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
```

### 2. Install Dependencies

Make sure you have all the required dependencies installed:

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

## Production Setup

### 1. Environment Variables

Set the following environment variables in your production environment:

- `GOOGLE_API_KEY`: Your Google API key for server-side operations
- `NEXT_PUBLIC_GOOGLE_API_KEY`: (Optional) Only if you need client-side access to the API

### 2. Build and Deploy

Build your application:

```bash
npm run build
# or
yarn build
```

Then deploy using your preferred hosting provider (Vercel, Netlify, etc.).

## Troubleshooting

### API Key Not Found

If you see errors about missing API keys:
1. Verify the `.env.local` file exists in the root directory
2. Ensure the environment variables are correctly named
3. Restart your development server after making changes to `.env.local`
4. Check browser console for client-side errors

### CORS Issues

If you encounter CORS errors when making API calls:
1. Ensure your API key has the correct CORS settings in Google Cloud Console
2. Verify the API key has the necessary permissions

## Security Considerations

1. Never commit `.env.local` to version control
2. Use different API keys for development and production
3. Consider implementing rate limiting on your API endpoints
4. Monitor your API usage to prevent abuse

## Implementation Details

The AI explainer uses two main components:

1. **Server-side (ai-service.ts)**:
   - Uses Genkit with Google AI plugin
   - Requires `GOOGLE_API_KEY`
   - Handles more complex AI operations

2. **Client-side (ai-service-client.ts)**:
   - Makes direct API calls to Google's Gemini API
   - Uses `NEXT_PUBLIC_GOOGLE_API_KEY`
   - Handles simple chat and explanation generation

## Customization

You can customize the AI's behavior by modifying the prompt templates in:
- `src/lib/ai-service.ts` (server-side)
- `src/lib/ai-service-client.ts` (client-side)

## Support

For additional help, please contact the development team or refer to the [Google AI Gemini documentation](https://ai.google.dev/).
