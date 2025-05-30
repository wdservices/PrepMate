
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

const PastQuestionWithYearSchema = z.object({
  questionText: z.string().describe('The text of the past question.'),
  year: z.number().describe('The year this question is from.'),
});
export type PastQuestionWithYear = z.infer<typeof PastQuestionWithYearSchema>;

const AnalysisInputSchema = z.object({
  examName: z.string().describe('The name of the exam (e.g., JAMB, WAEC, NECO).'),
  subject: z.string().describe('The subject to analyze (e.g., Biology, Chemistry, English).'),
  pastQuestions: z.array(PastQuestionWithYearSchema).describe('An array of past exam questions, each with its text and year.'),
});
export type AnalysisInput = z.infer<typeof AnalysisInputSchema>;

const FrequentQuestionDetailSchema = z.object({
  questionText: z.string().describe('The text of the frequently asked question.'),
  appearedInYears: z.array(z.number()).describe('An array of years in which this question appeared.'),
  topic: z.string().optional().describe('The general topic this question relates to, if identifiable.'),
});
export type FrequentQuestionDetail = z.infer<typeof FrequentQuestionDetailSchema>;

const AnalysisOutputSchema = z.object({
  frequentQuestions: z.array(FrequentQuestionDetailSchema).describe('The most frequently asked questions, including the years they appeared and their topic.'),
  predictedQuestions: z.array(z.string()).describe('Predictions for likely repeated questions or topics in future exams.'),
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
  prompt: `You are an AI expert in analyzing past exam questions to identify frequently asked questions and predict likely repeated questions for the {{examName}} {{subject}} exam.

Analyze the following past questions. Each question is provided with its year of appearance:
{{#each pastQuestions}}
- Year {{this.year}}: {{{this.questionText}}}
{{/each}}

Your task is to:
1. Identify questions that are identical or extremely similar and have appeared in multiple years. For each such frequent question:
    a. Provide the exact question text.
    b. List all the distinct years it appeared in (e.g., [2001, 2004, 2005]).
    c. If possible, identify a general topic for the question.
2. Predict which specific questions or general topics are likely to be repeated in future exams based on your analysis of frequency and trends.
3. Generate a concise summary of your findings, highlighting key recurring topics and any noticeable patterns in question repetition.

Structure your output precisely as follows:
- frequentQuestions: An array of objects. Each object MUST have:
    - questionText: (string) The text of the frequently asked question.
    - appearedInYears: (array of numbers) The years this question appeared.
    - topic: (string, optional) The general topic of the question.
- predictedQuestions: An array of strings representing predictions for likely repeated questions or key topics.
- analysisSummary: A string summarizing the analysis.

Focus on accuracy in identifying repeated questions and the years they appeared. Be detailed in your output.
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

