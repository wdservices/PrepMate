// Implemented Genkit flow for analyzing frequently asked questions and predicting likely repeated questions.

'use server';

/**
 * @fileOverview AI-powered predictive analysis for exam questions.
 *
 * - analyzeQuestionFrequency - Analyzes question frequency and predicts likely repeated questions.
 * - AnalysisInput - The input type for the analyzeQuestionFrequency function.
 * - AnalysisOutput - The return type for the analyzeQuestionFrequency function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalysisInputSchema = z.object({
  examName: z.string().describe('The name of the exam (e.g., JAMB, WAEC, NECO).'),
  subject: z.string().describe('The subject to analyze (e.g., Biology, Chemistry, English).'),
  pastQuestions: z.array(z.string()).describe('An array of past exam questions for the specified subject and exam.'),
});
export type AnalysisInput = z.infer<typeof AnalysisInputSchema>;

const AnalysisOutputSchema = z.object({
  frequentQuestions: z.array(z.string()).describe('The most frequently asked questions across multiple years.'),
  predictedQuestions: z.array(z.string()).describe('Predictions for likely repeated questions in future exams.'),
  analysisSummary: z.string().describe('A summary of the analysis, including key topics and trends.'),
});
export type AnalysisOutput = z.infer<typeof AnalysisOutputSchema>;

export async function analyzeQuestionFrequency(input: AnalysisInput): Promise<AnalysisOutput> {
  return analyzeQuestionFrequencyFlow(input);
}

const analyzeQuestionFrequencyPrompt = ai.definePrompt({
  name: 'analyzeQuestionFrequencyPrompt',
  input: {schema: AnalysisInputSchema},
  output: {schema: AnalysisOutputSchema},
  prompt: `You are an AI expert in analyzing past exam questions to identify frequently asked questions and predict likely repeated questions.

  Analyze the following past questions for {{examName}} {{subject}}:
  {{#each pastQuestions}}
  - {{{this}}}
  {{/each}}

  Identify the most frequent questions and predict which questions are likely to be repeated in future exams. Also, generate a summary of your findings.
  Ensure that you are very detailed in your output.

  Output should contain three fields:
  - frequentQuestions: An array of the most frequently asked questions.
  - predictedQuestions: An array of predictions for likely repeated questions in future exams.
  - analysisSummary: A summary of the analysis, including key topics and trends.
  `,
});

const analyzeQuestionFrequencyFlow = ai.defineFlow(
  {
    name: 'analyzeQuestionFrequencyFlow',
    inputSchema: AnalysisInputSchema,
    outputSchema: AnalysisOutputSchema,
  },
  async input => {
    const {output} = await analyzeQuestionFrequencyPrompt(input);
    return output!;
  }
);
