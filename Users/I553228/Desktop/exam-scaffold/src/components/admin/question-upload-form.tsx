
"use client";

import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, AlertTriangle, ImagePlus, Loader2, CheckCircle } from 'lucide-react';
import type { Question, QuestionOption, FirestoreExamData, FirestoreSubjectData } from '@/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getExamsFromFirestore, getSubjectsForExamFromFirestore, addQuestionToFirestore } from '@/lib/firebase-service';

export function QuestionUploadForm() {
  const [exams, setExams] = useState<FirestoreExamData[]>([]);
  const [subjects, setSubjects] = useState<FirestoreSubjectData[]>([]);

  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [questionText, setQuestionText] = useState<string>("");
  const [optionAText, setOptionAText] = useState<string>("");
  const [optionBText, setOptionBText] = useState<string>("");
  const [optionCText, setOptionCText] = useState<string>("");
  const [optionDText, setOptionDText] = useState<string>("");
  const [correctOption, setCorrectOption] = useState<string>("");
  
  // Note: Image upload to Firebase Storage is not implemented in this form.
  // It only handles the imageUrl text field.
  const [imageUrl, setImageUrl] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    async function fetchExams() {
      setIsLoading(true);
      try {
        const examsData = await getExamsFromFirestore();
        setExams(examsData);
      } catch (error) {
        toast({ title: "Error", description: "Could not fetch exams from database.", variant: "destructive" });
      } finally {
        setIsLoading(false);
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
      setIsLoading(true);
      try {
        const subjectsData = await getSubjectsForExamFromFirestore(selectedExamId);
        setSubjects(subjectsData);
      } catch (error) {
        toast({ title: "Error", description: "Could not fetch subjects for the selected exam.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSubjects();
  }, [selectedExamId, toast]);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    if (!selectedExamId || !selectedSubjectId || !year || !questionText || !optionAText || !optionBText || !correctOption) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields: Exam, Subject, Year, Question, Options A & B, Correct Option.",
        variant: "destructive",
      });
      setIsUploading(false);
      return;
    }
    
    const options: QuestionOption[] = [];
    options.push({ id: "opt1", text: optionAText });
    options.push({ id: "opt2", text: optionBText });
    if (optionCText) options.push({ id: "opt3", text: optionCText });
    if (optionDText) options.push({ id: "opt4", text: optionDText });

    let actualCorrectOptionId = "";
    if (correctOption === "A") actualCorrectOptionId = "opt1";
    else if (correctOption === "B") actualCorrectOptionId = "opt2";
    else if (correctOption === "C" && optionCText) actualCorrectOptionId = "opt3";
    else if (correctOption === "D" && optionDText) actualCorrectOptionId = "opt4";
    
    if (!actualCorrectOptionId) {
         toast({
            title: "Invalid Correct Option",
            description: "The selected correct option letter does not correspond to a filled-in option.",
            variant: "destructive",
        });
        setIsUploading(false);
        return;
    }

    const questionData: Omit<Question, 'id'> = {
      year: parseInt(year),
      text: questionText,
      options: options,
      correctOptionId: actualCorrectOptionId,
      imageUrl: imageUrl || undefined, 
    };

    try {
        await addQuestionToFirestore(selectedExamId, selectedSubjectId, questionData);
        toast({
            title: "Success!",
            description: "The question has been successfully uploaded to the database.",
            variant: "default",
            action: <CheckCircle className="text-green-500" />
        });
        // Clear form after successful upload
        // setYear(""); setQuestionText(""); setOptionAText(""); setOptionBText("");
        // setOptionCText(""); setOptionDText(""); setCorrectOption(""); setImageUrl("");

    } catch (error) {
         toast({
            title: "Upload Failed",
            description: (error as Error).message || "An unknown error occurred during upload.",
            variant: "destructive",
        });
    } finally {
        setIsUploading(false);
    }
  };


  return (
    <Card className="shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
            <UploadCloud className="mr-3 h-6 w-6 text-primary" />
            Upload Question to Database
        </CardTitle>
        <CardDescription>
          Fill this form to add a new past question directly to the Firestore database.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="upload-examId">Exam*</Label>
              <Select value={selectedExamId} onValueChange={(value) => { setSelectedExamId(value); setSelectedSubjectId(""); }} disabled={isLoading}>
                <SelectTrigger id="upload-examId" className="mt-1">
                  <SelectValue placeholder={isLoading ? "Loading..." : "Select Exam"} />
                </SelectTrigger>
                <SelectContent>
                  {exams.map(exam => (
                    <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="upload-subjectId">Subject*</Label>
              <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId} disabled={!selectedExamId || isLoading}>
                <SelectTrigger id="upload-subjectId" className="mt-1">
                  <SelectValue placeholder={isLoading ? "Loading..." : "Select Subject"} />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="upload-year">Year*</Label>
            <Input
              id="upload-year" type="number" value={year} onChange={(e) => setYear(e.target.value)}
              placeholder="E.g., 2023" className="mt-1" min="1900" max={new Date().getFullYear() + 1}
            />
          </div>

          <div>
            <Label htmlFor="upload-questionText">Question Text*</Label>
            <Textarea
              id="upload-questionText" value={questionText} onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter the full question text here..." className="mt-1" rows={4}
            />
          </div>

          <div>
            <Label htmlFor="upload-imageUrl">Image URL (Optional)</Label>
            <div className="mt-1 flex items-center gap-4">
                <Input
                  id="upload-imageUrl" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="E.g., https://.../image.png" className="flex-1"
                />
                <ImagePlus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
                Note: This does not upload a file. You must upload the image to a service (like Firebase Storage) and paste the public URL here.
            </p>
             {imageUrl && (
              <div className="mt-3 relative w-32 h-32 border rounded-md overflow-hidden shadow-sm">
                <img src={imageUrl} alt="Image preview" className="object-contain w-full h-full" data-ai-hint="diagram chart" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Label>Options* (At least A and B are required)</Label>
            <Input id="upload-optionA" value={optionAText} onChange={(e) => setOptionAText(e.target.value)} placeholder="Option A text (Required)" />
            <Input id="upload-optionB" value={optionBText} onChange={(e) => setOptionBText(e.target.value)} placeholder="Option B text (Required)" />
            <Input id="upload-optionC" value={optionCText} onChange={(e) => setOptionCText(e.target.value)} placeholder="Option C text (Optional)" />
            <Input id="upload-optionD" value={optionDText} onChange={(e) => setOptionDText(e.target.value)} placeholder="Option D text (Optional)" />
          </div>
          
          <div>
            <Label htmlFor="upload-correctOption">Correct Option Letter*</Label>
            <Select value={correctOption} onValueChange={setCorrectOption}>
              <SelectTrigger id="upload-correctOption" className="mt-1">
                <SelectValue placeholder="Select Correct Option Letter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Option A</SelectItem>
                <SelectItem value="B">Option B</SelectItem>
                {optionCText && <SelectItem value="C">Option C</SelectItem>}
                {optionDText && <SelectItem value="D">Option D</SelectItem>}
              </SelectContent>
            </Select>
             {!optionCText && correctOption === "C" && setCorrectOption("")}
             {(!optionCText || !optionDText) && correctOption === "D" && setCorrectOption("")}
          </div>
          
        </CardContent>
        <CardFooter>
          <Button type="submit" size="lg" disabled={isUploading}>
            {isUploading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UploadCloud className="mr-2 h-5 w-5" />}
            {isUploading ? 'Uploading...' : 'Upload Question'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
