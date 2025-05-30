
// src/ai/flows/ai-question-assistant.ts
'use server';
/**
 * @fileOverview AI-powered question assistant for students to get explanations,
 * summaries, and recommendations. It can use the current subject and question as context
 * but is not limited to them.
 *
 * - aiQuestionAssistant - A function that handles the AI question assistant process.
 * - AiQuestionAssistantInput - The input type for the aiQuestionAssistant function.
 * - AiQuestionAssistantOutput - The return type for the aiQuestionAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiQuestionAssistantInputSchema = z.object({
  subject: z.string().describe('The subject context, if any (e.g., "Biology", "General Academic Support").'),
  question: z.string().describe('The specific question being viewed, if any (e.g., "What is mitosis?", "No specific question being viewed.").'),
  studentQuery: z.string().describe('The student\u2019s specific question or request to the AI assistant.'),
});
export type AiQuestionAssistantInput = z.infer<typeof AiQuestionAssistantInputSchema>;

const AiQuestionAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\u2019s answer to the student\u2019s query.'),
});
export type AiQuestionAssistantOutput = z.infer<typeof AiQuestionAssistantOutputSchema>;

export async function aiQuestionAssistant(input: AiQuestionAssistantInput): Promise<AiQuestionAssistantOutput> {
  return aiQuestionAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiQuestionAssistantPrompt',
  input: {schema: AiQuestionAssistantInputSchema},
  output: {schema: AiQuestionAssistantOutputSchema},
  prompt: `You are a friendly and helpful AI academic assistant.

The student's direct query is:
"{{{studentQuery}}}"

For additional context, if relevant to their query:
- Subject they might be looking at: {{{subject}}}
- Specific question they might be viewing: {{{question}}}

Please provide a comprehensive and informative answer directly addressing the student's query ("{{{studentQuery}}}").
If the provided subject and question context is relevant to their query, feel free to use that information to enrich your answer. Otherwise, focus on the student's main query.
Be helpful, clear, and encouraging.`,
});

const aiQuestionAssistantFlow = ai.defineFlow(
  {
    name: 'aiQuestionAssistantFlow',
    inputSchema: AiQuestionAssistantInputSchema,
    outputSchema: AiQuestionAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
