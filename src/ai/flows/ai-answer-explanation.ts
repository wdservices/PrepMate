
'use server';
/**
 * @fileOverview Provides AI-powered explanations for answers to practice questions.
 *
 * - aiExplainAnswer - A function that provides explanations for an answer.
 * - AiExplainAnswerInput - The input type for the aiExplainAnswer function.
 * - AiExplainAnswerOutput - The return type for the aiExplainAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const AiExplainAnswerInputSchema = z.object({
  question: z.string().describe('The question that was asked.'),
  correctAnswerText: z.string().describe('The text of the correct answer.'),
  isCorrect: z.boolean().describe('Whether the student\u2019s answer was correct.'),
  studentAnswerTextIfIncorrect: z.string().optional().describe('The student\u2019s incorrect answer text, if applicable.'),
  subject: z.string().describe('The subject of the question.'),
});
export type AiExplainAnswerInput = z.infer<typeof AiExplainAnswerInputSchema>;

export const AiExplainAnswerOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'An explanation of why the provided answer is correct, or why the student\u2019s answer was incorrect and the correct answer is correct.'
    ),
});
export type AiExplainAnswerOutput = z.infer<typeof AiExplainAnswerOutputSchema>;

export async function aiExplainAnswer(input: AiExplainAnswerInput): Promise<AiExplainAnswerOutput> {
  return aiExplainAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiExplainAnswerPrompt',
  input: {schema: AiExplainAnswerInputSchema},
  output: {schema: AiExplainAnswerOutputSchema},
  prompt: `You are an expert tutor in {{{subject}}}.

{{#if isCorrect}}
A student correctly answered the following question:
Question: "{{{question}}}"
Their Answer (which is correct): "{{{correctAnswerText}}}"

Provide a brief affirmation and explain why this answer is correct, reinforcing the concept. Be encouraging and concise.
{{else}}
A student answered the following question incorrectly:
Question: "{{{question}}}"
Student's Answer: "{{{studentAnswerTextIfIncorrect}}}"
Correct Answer: "{{{correctAnswerText}}}"

Explain to the student why their answer was incorrect and why the correct answer is correct. Be helpful, but don't be too verbose.
{{/if}}
  `,
});

const aiExplainAnswerFlow = ai.defineFlow(
  {
    name: 'aiExplainAnswerFlow',
    inputSchema: AiExplainAnswerInputSchema,
    outputSchema: AiExplainAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
