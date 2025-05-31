
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, AlertTriangle } from 'lucide-react';
import { exams } from '@/data/mock-data'; // For exam and subject selection (can be dynamic later)
import type { Question, QuestionOption } from '@/types';

export default function UploadQuestionPage() {
  const [examId, setExamId] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [questionText, setQuestionText] = useState<string>("");
  const [optionAText, setOptionAText] = useState<string>("");
  const [optionBText, setOptionBText] = useState<string>("");
  const [optionCText, setOptionCText] = useState<string>("");
  const [optionDText, setOptionDText] = useState<string>("");
  const [correctOption, setCorrectOption] = useState<string>(""); // "opt1", "opt2", "opt3", "opt4"

  const { toast } = useToast();

  const selectedExam = exams.find(e => e.id === examId);
  const subjectsForSelectedExam = selectedExam ? selectedExam.subjects : [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!examId || !subjectId || !year || !questionText || !optionAText || !optionBText || !correctOption) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields (Exam, Subject, Year, Question, Options A & B, Correct Option).",
        variant: "destructive",
      });
      return;
    }
    
    const newQuestionId = `${examId}-${subjectId}-${year}-${Date.now()}`; // Simple unique ID for now
    const options: QuestionOption[] = [
      { id: "opt1", text: optionAText },
      { id: "opt2", text: optionBText },
    ];
    if (optionCText) options.push({ id: "opt3", text: optionCText });
    if (optionDText) options.push({ id: "opt4", text: optionDText });


    const questionData: Partial<Question> & { examId: string; subjectId: string } = {
      id: newQuestionId,
      examId: examId,
      subjectId: subjectId,
      year: parseInt(year),
      text: questionText,
      options: options,
      correctOptionId: correctOption,
    };

    console.log("New Question Data:", questionData);

    // Here you would typically send this data to your backend/Firestore
    toast({
      title: "Question Data Logged",
      description: "Question data has been logged to the console. Backend submission not yet implemented.",
    });

    // Reset form (optional)
    // setExamId(""); setSubjectId(""); setYear(""); setQuestionText(""); 
    // setOptionAText(""); setOptionBText(""); setOptionCText(""); setOptionDText("");
    // setCorrectOption("");
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <UploadCloud className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Upload New Question
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Fill in the details below to add a new past question to the system.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
          <CardDescription>
            Ensure all information is accurate. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="examId">Exam*</Label>
                <Select value={examId} onValueChange={setExamId}>
                  <SelectTrigger id="examId" className="mt-1">
                    <SelectValue placeholder="Select Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map(exam => (
                      <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subjectId">Subject*</Label>
                <Select value={subjectId} onValueChange={setSubjectId} disabled={!selectedExam}>
                  <SelectTrigger id="subjectId" className="mt-1">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsForSelectedExam.map(subject => (
                      <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="year">Year*</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="E.g., 2023"
                className="mt-1"
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div>
              <Label htmlFor="questionText">Question Text*</Label>
              <Textarea
                id="questionText"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter the full question text here..."
                className="mt-1"
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <Label>Options*</Label>
              <Input id="optionA" value={optionAText} onChange={(e) => setOptionAText(e.target.value)} placeholder="Option A text (Required)" />
              <Input id="optionB" value={optionBText} onChange={(e) => setOptionBText(e.target.value)} placeholder="Option B text (Required)" />
              <Input id="optionC" value={optionCText} onChange={(e) => setOptionCText(e.target.value)} placeholder="Option C text (Optional)" />
              <Input id="optionD" value={optionDText} onChange={(e) => setOptionDText(e.target.value)} placeholder="Option D text (Optional)" />
            </div>
            
            <div>
              <Label htmlFor="correctOption">Correct Option*</Label>
              <Select value={correctOption} onValueChange={setCorrectOption}>
                <SelectTrigger id="correctOption" className="mt-1">
                  <SelectValue placeholder="Select Correct Option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opt1">Option A</SelectItem>
                  <SelectItem value="opt2">Option B</SelectItem>
                  {optionCText && <SelectItem value="opt3">Option C</SelectItem>}
                  {optionDText && <SelectItem value="opt4">Option D</SelectItem>}
                </SelectContent>
              </Select>
               {!optionCText && !optionDText && correctOption === "opt3" && setCorrectOption("")}
               {!optionDText && correctOption === "opt4" && setCorrectOption("")}
            </div>
            
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg">
              <UploadCloud className="mr-2 h-5 w-5" />
              Submit Question (Logs to Console)
            </Button>
          </CardFooter>
        </form>
      </Card>
       <Alert variant="default" className="mt-8 bg-blue-50 border-blue-300 text-blue-700">
        <AlertTriangle className="h-5 w-5 !text-blue-600" />
        <AlertTitle className="font-semibold">Next Steps</AlertTitle>
        <AlertDescription>
          This form currently logs the question data to the browser console.
          To make this functional, it needs to be connected to a backend service (like a Firebase Cloud Function)
          that saves the data to a Firestore database. The question display pages would then also need to be updated
          to fetch questions from Firestore.
        </AlertDescription>
      </Alert>
    </div>
  );
}

