
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertTriangle, Brain, ListChecks, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeQuestionFrequency, type AnalysisOutput } from "@/ai/flows/predictive-analysis";
import { exams, getPastQuestionsForAnalysis } from "@/data/mock-data";
import type { Exam, Subject } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function InsightsPage() {
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const selectedExam = exams.find(e => e.id === selectedExamId);
  const subjectsForSelectedExam = selectedExam ? selectedExam.subjects : [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedExamId || !selectedSubjectId) {
      toast({ title: "Selection Missing", description: "Please select an exam and a subject.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const exam = exams.find(e => e.id === selectedExamId);
      const subject = exam?.subjects.find(s => s.id === selectedSubjectId);

      if (!exam || !subject) {
        throw new Error("Selected exam or subject not found.");
      }
      
      const pastQuestionsText = getPastQuestionsForAnalysis(exam.id, subject.id);
      if (pastQuestionsText.length === 0) {
        toast({ title: "No Data", description: `No past questions found for ${subject.name} in ${exam.name} to analyze.`, variant: "default" });
        setIsLoading(false);
        return;
      }

      const result = await analyzeQuestionFrequency({
        examName: exam.name,
        subject: subject.name,
        pastQuestions: pastQuestionsText,
      });
      setAnalysisResult(result);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      setError(err.message || "Failed to generate insights. Please try again.");
      toast({ title: "Analysis Failed", description: err.message || "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderQuestionList = (questions: string[], title: string, icon: React.ReactNode) => (
    <Card className="shadow-sm">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-xl">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {questions.length > 0 ? (
          <ul className="space-y-2">
            {questions.map((q, index) => (
              <li key={index} className="text-sm p-2 border-b last:border-b-0">
                {q}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">No specific questions identified for this category.</p>
        )}
      </CardContent>
    </Card>
  );


  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center justify-center">
          <Brain className="mr-3 h-10 w-10 text-primary" /> Exam Insights
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
          Leverage AI to discover frequently asked questions and predict potential topics for your upcoming exams.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Select Exam and Subject</CardTitle>
          <CardDescription>Choose an exam and subject to generate predictive analysis.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="exam" className="text-base">Exam</Label>
                <Select value={selectedExamId} onValueChange={(value) => { setSelectedExamId(value); setSelectedSubjectId(""); setAnalysisResult(null); }}>
                  <SelectTrigger id="exam" className="mt-1">
                    <SelectValue placeholder="Select an exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject" className="text-base">Subject</Label>
                <Select value={selectedSubjectId} onValueChange={(value) => { setSelectedSubjectId(value); setAnalysisResult(null); }} disabled={!selectedExamId}>
                  <SelectTrigger id="subject" className="mt-1">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsForSelectedExam.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !selectedExamId || !selectedSubjectId} className="w-full sm:w-auto" size="lg">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
              Analyze Questions
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Generating insights, please wait...</p>
        </div>
      )}

      {error && (
        <Card className="border-destructive bg-destructive/10">
            <CardHeader className="flex flex-row items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <CardTitle className="text-destructive">Analysis Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-destructive-foreground">{error}</p>
            </CardContent>
        </Card>
      )}

      {analysisResult && !isLoading && (
        <Card className="shadow-xl">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-2xl text-primary">Analysis Results for {selectedExam?.name} - {selectedExam?.subjects.find(s => s.id === selectedSubjectId)?.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <Card>
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-xl">Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <p className="text-base whitespace-pre-line">{analysisResult.analysisSummary}</p>
                </CardContent>
            </Card>
            
            <Accordion type="single" collapsible className="w-full" defaultValue="frequent">
              <AccordionItem value="frequent">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  <div className="flex items-center">
                    <ListChecks className="mr-3 h-6 w-6 text-accent" /> Frequently Asked Questions
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-1">
                  {renderQuestionList(analysisResult.frequentQuestions, "", null)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="predicted">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                   <div className="flex items-center">
                    <HelpCircle className="mr-3 h-6 w-6 text-accent" /> Predicted Likely Questions/Topics
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-1">
                  {renderQuestionList(analysisResult.predictedQuestions, "", null)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
