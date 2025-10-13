"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertTriangle, Brain, ListChecks, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeQuestionFrequency, type AnalysisOutput, type FrequentQuestionDetail } from "@/ai/flows/predictive-analysis";
import { examService } from '@/lib/firestore-service';
import type { Exam, Subject, Question } from "@/lib/firestore-service";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SmartAnalysisPage() { 
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadExams = async () => {
      try {
        console.log('[Insights] Fetching exams...');
        const examsList = await examService.getAllExams();
        console.log('[Insights] Fetched exams:', examsList);
        setExams(examsList);
        setError(null);
      } catch (err) {
        console.error('[Insights] Failed to load exams:', err);
        setError('Failed to load exams. Please try again.');
        toast({
          title: "Error",
          description: "Failed to load exams. Please try again.",
          variant: "destructive",
        });
      }
    };
    loadExams();
  }, []);

  useEffect(() => {
    const loadSubjects = async () => {
      if (!selectedExamId) {
        setSubjects([]);
        return;
      }
      
      try {
        console.log(`[Insights] Fetching subjects for exam ${selectedExamId}...`);
        const subjectsList = await examService.getSubjectsByExam(selectedExamId);
        console.log(`[Insights] Fetched ${subjectsList.length} subjects for exam ${selectedExamId}:`, subjectsList);
        setSubjects(subjectsList);
        setSelectedSubjectId(""); // Reset subject selection when exam changes
        setError(null);
      } catch (err) {
        console.error(`[Insights] Failed to load subjects for exam ${selectedExamId}:`, err);
        setSubjects([]);
        setError('Failed to load subjects. Please try again.');
        toast({
          title: "Error",
          description: "Failed to load subjects. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    loadSubjects();
  }, [selectedExamId]);

  const handleAnalysis = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedExamId || !selectedSubjectId) return;

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // Get questions for the selected subject
      const questions = await examService.getQuestionsBySubject(selectedExamId, selectedSubjectId);
      
      if (questions.length === 0) {
        throw new Error('No questions found for the selected subject');
      }

      // Format questions for analysis
      const formattedQuestions = questions.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options.map(opt => opt.text),
        correctAnswer: q.correctOptionId,
        year: q.year
      }));

      // Run analysis
      const result = analyzeQuestionFrequency(formattedQuestions);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: "Question frequency analysis has been generated.",
      });
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to perform analysis');
      toast({
        title: "Analysis Failed",
        description: error || "An unknown error occurred during analysis.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Smart Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Get insights into question patterns and frequencies
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Analysis Parameters</CardTitle>
          <CardDescription>
            Select an exam and subject to analyze question patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalysis} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="exam">Select Exam</Label>
                <Select 
                  value={selectedExamId} 
                  onValueChange={setSelectedExamId}
                  disabled={isLoading}
                >
                  <SelectTrigger id="exam">
                    <SelectValue placeholder="Select an exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Select Subject</Label>
                <Select 
                  value={selectedSubjectId} 
                  onValueChange={setSelectedSubjectId}
                  disabled={!selectedExamId || isLoading}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder={selectedExamId ? "Select a subject" : "Select an exam first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!selectedExamId || !selectedSubjectId || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Questions
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-8 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Error</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {analysisResult && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Question frequency analysis for {subjects.find(s => s.id === selectedSubjectId)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold">{analysisResult.totalQuestions}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Unique Questions</p>
                  <p className="text-2xl font-bold">{analysisResult.uniqueQuestions}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Most Frequent Year</p>
                  <p className="text-2xl font-bold">{analysisResult.mostFrequentYear || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {analysisResult.frequentQuestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Questions that appear most frequently across exams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {analysisResult.frequentQuestions.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{item.questionText}</span>
                          <span className="text-sm text-muted-foreground">
                            (Appears {item.frequency} times)
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-1">
                          <p className="text-sm">
                            <span className="font-medium">Correct Answer:</span>{' '}
                            {item.correctAnswer}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Appears in years:</span>{' '}
                            {item.years.join(', ')}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
