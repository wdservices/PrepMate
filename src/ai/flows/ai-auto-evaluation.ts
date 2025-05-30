'use server';
/**
 * @fileOverview Provides AI-powered explanations for incorrect answers to practice questions.
 *
 * - aiAutoEvaluate - A function that provides explanations for incorrect answers.
 * - AiAutoEvaluateInput - The input type for the aiAutoEvaluate function.
 * - AiAutoEvaluateOutput - The return type for the aiAutoEvaluate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAutoEvaluateInputSchema = z.object({
  question: z.string().describe('The question that was asked.'),
  studentAnswer: z.string().describe('The answer provided by the student.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  subject: z.string().describe('The subject of the question.'),
});
export type AiAutoEvaluateInput = z.infer<typeof AiAutoEvaluateInputSchema>;

const AiAutoEvaluateOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'An explanation of why the student answer was incorrect and why the correct answer is correct.'
    ),
});
export type AiAutoEvaluateOutput = z.infer<typeof AiAutoEvaluateOutputSchema>;

export async function aiAutoEvaluate(input: AiAutoEvaluateInput): Promise<AiAutoEvaluateOutput> {
  return aiAutoEvaluateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAutoEvaluatePrompt',
  input: {schema: AiAutoEvaluateInputSchema},
  output: {schema: AiAutoEvaluateOutputSchema},
  prompt: `You are an expert tutor in {{{subject}}}.

  A student answered the following question incorrectly:

  Question: {{{question}}}
  Student's Answer: {{{studentAnswer}}}
  Correct Answer: {{{correctAnswer}}}

  Explain to the student why their answer was incorrect and why the correct answer is correct.  Be helpful, but don't be too verbose.
  `,
});

const aiAutoEvaluateFlow = ai.defineFlow(
  {
    name: 'aiAutoEvaluateFlow',
    inputSchema: AiAutoEvaluateInputSchema,
    outputSchema: AiAutoEvaluateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
