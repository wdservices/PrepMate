
"use client";

import { useState, type FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertTriangle, Brain, ListChecks, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeQuestionFrequency, type AnalysisOutput, type FrequentQuestionDetail, PastQuestionWithYear } from "@/ai/flows/predictive-analysis";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getExamsFromFirestore, getSubjectsForExamFromFirestore, getAllQuestionsForSubject } from "@/lib/firebase-service";
import type { FirestoreExamData, FirestoreSubjectData, Question } from "@/types";

export default function SmartAnalysisPage() { 
  const [exams, setExams] = useState<FirestoreExamData[]>([]);
  const [subjects, setSubjects] = useState<FirestoreSubjectData[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false); // For analysis generation
  const [isDropdownLoading, setIsDropdownLoading] = useState(true); // For dropdowns
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchExams() {
      setIsDropdownLoading(true);
      try {
        const examsData = await getExamsFromFirestore();
        setExams(examsData);
      } catch (error) {
        toast({ title: "Error", description: "Could not fetch exams.", variant: "destructive" });
      } finally {
        setIsDropdownLoading(false);
      }
    }
    fetchExams();
  }, [toast]);

  useEffect(() => {
    async function fetchSubjects() {
      if (!selectedExamId) {
        setSubjects([]);
        return;
      }
      setIsDropdownLoading(true);
      try {
        const subjectsData = await getSubjectsForExamFromFirestore(selectedExamId);
        setSubjects(subjectsData);
      } catch (error) {
        toast({ title: "Error", description: "Could not fetch subjects.", variant: "destructive" });
      } finally {
        setIsDropdownLoading(false);
      }
    }
    fetchSubjects();
  }, [selectedExamId, toast]);

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
      const subject = subjects.find(s => s.id === selectedSubjectId);

      if (!exam || !subject) {
        throw new Error("Selected exam or subject not found.");
      }
      
      const allQuestions = await getAllQuestionsForSubject(exam.id, subject.id);
      
      if (allQuestions.length === 0) {
        toast({ title: "No Data", description: `No past questions found in the database for ${subject.name} to analyze.`, variant: "default" });
        setIsLoading(false);
        return;
      }

      // Map Firestore questions to the format expected by the AI flow
      const pastQuestionsForAI: PastQuestionWithYear[] = allQuestions.map(q => ({
          questionText: q.text,
          year: q.year,
      }));

      const result = await analyzeQuestionFrequency({
        examName: exam.name,
        subject: subject.name,
        pastQuestions: pastQuestionsForAI,
      });
      setAnalysisResult(result);

    } catch (err: any) {
      console.error("Analysis failed:", err);
      setError(err.message || "Failed to generate smart analysis. Please try again.");
      toast({ title: "Analysis Failed", description: err.message || "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderFrequentQuestionList = (questions: FrequentQuestionDetail[]) => (
    <Card className="shadow-sm border-none bg-transparent">
      <CardContent className="pt-2">
        {questions.length > 0 ? (
          <ul className="space-y-3">
            {questions.map((q, index) => (
              <li key={index} className="text-sm p-3 border rounded-md shadow-sm bg-card hover:shadow-md transition-shadow">
                <p className="font-medium text-foreground leading-relaxed">{q.questionText}</p>
                <p className="text-xs text-muted-foreground mt-1.5">
                  <span className="font-semibold">Appeared in:</span> {q.appearedInYears.join(', ')}
                </p>
                {q.topic && (
                    <p className="text-xs text-primary/90 mt-1"><span className="font-semibold">Topic:</span> {q.topic}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">No specific frequent questions identified with year data.</p>
        )}
      </CardContent>
    </Card>
  );

  const renderPredictedQuestionList = (questions: string[]) => (
    <Card className="shadow-sm border-none bg-transparent">
      <CardContent className="pt-2">
        {questions.length > 0 ? (
          <ul className="space-y-2">
            {questions.map((q, index) => (
              <li key={index} className="text-sm p-2.5 border-b last:border-b-0 bg-card rounded-md shadow-sm">
                {q}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">No specific predictions identified for this category.</p>
        )}
      </CardContent>
    </Card>
  );


  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center justify-center">
          <Brain className="mr-3 h-10 w-10 text-primary" /> Smart Analysis
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
          Leverage AI to discover frequently asked questions, the years they appeared, and predict potential topics for your upcoming exams.
        </p>
      </div>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Select Exam and Subject</CardTitle>
          <CardDescription>Choose an exam and subject to generate smart analysis from the database.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="exam" className="text-base">Exam</Label>
                <Select value={selectedExamId} onValueChange={(value) => { setSelectedExamId(value); setSelectedSubjectId(""); setAnalysisResult(null); }} disabled={isDropdownLoading}>
                  <SelectTrigger id="exam" className="mt-1">
                    <SelectValue placeholder={isDropdownLoading ? "Loading exams..." : "Select an exam"} />
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
                <Select value={selectedSubjectId} onValueChange={(value) => { setSelectedSubjectId(value); setAnalysisResult(null); }} disabled={!selectedExamId || isDropdownLoading}>
                  <SelectTrigger id="subject" className="mt-1">
                    <SelectValue placeholder={!selectedExamId ? "Select exam first" : isDropdownLoading ? "Loading subjects..." : "Select a subject"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || isDropdownLoading || !selectedExamId || !selectedSubjectId} className="w-full sm:w-auto" size="lg">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
              Generate Smart Analysis
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Generating smart analysis, please wait...</p>
        </div>
      )}

      {error && (
        <Card className="border-destructive bg-destructive/10 rounded-xl">
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
        <Card className="shadow-xl rounded-xl">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-2xl text-primary">Smart Analysis Results for {exams.find(e=>e.id === selectedExamId)?.name} - {subjects.find(s=>s.id === selectedSubjectId)?.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <Card className="rounded-lg">
                <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="text-xl">Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <p className="text-base whitespace-pre-line leading-relaxed">{analysisResult.analysisSummary}</p>
                </CardContent>
            </Card>
            
            <Accordion type="single" collapsible className="w-full" defaultValue="frequent">
              <AccordionItem value="frequent" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline px-4 py-3 bg-muted/40 hover:bg-muted/60">
                  <div className="flex items-center">
                    <ListChecks className="mr-3 h-6 w-6 text-primary" /> Frequently Asked Questions
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-1 pt-3 bg-background">
                  {renderFrequentQuestionList(analysisResult.frequentQuestions)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="predicted" className="border rounded-lg overflow-hidden mt-4">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline px-4 py-3 bg-muted/40 hover:bg-muted/60">
                   <div className="flex items-center">
                    <HelpCircle className="mr-3 h-6 w-6 text-primary" /> Predicted Likely Questions/Topics
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-1 pt-3 bg-background">
                  {renderPredictedQuestionList(analysisResult.predictedQuestions)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
