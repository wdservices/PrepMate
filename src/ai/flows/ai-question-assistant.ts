// src/ai/flows/ai-question-assistant.ts
'use server';
/**
 * @fileOverview AI-powered question assistant for students to get explanations,
 * summaries, and recommendations related to a specific subject and question.
 *
 * - aiQuestionAssistant - A function that handles the AI question assistant process.
 * - AiQuestionAssistantInput - The input type for the aiQuestionAssistant function.
 * - AiQuestionAssistantOutput - The return type for the aiQuestionAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiQuestionAssistantInputSchema = z.object({
  subject: z.string().describe('The subject of the question.'),
  question: z.string().describe('The question the student is asking about.'),
  studentQuery: z.string().describe('The student\u2019s specific question or request.'),
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
  prompt: `You are an AI assistant helping a student with their studies.

The student is studying the subject: {{{subject}}}

The question they are working on is: {{{question}}}

The student is asking the following: {{{studentQuery}}}

Provide a helpful and informative answer to the student\u2019s question.`,
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
