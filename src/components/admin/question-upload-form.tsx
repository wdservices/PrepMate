
"use client";

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, AlertTriangle, ImagePlus } from 'lucide-react';
import { exams } from '@/data/mock-data';
import type { Question, QuestionOption } from '@/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function QuestionUploadForm() {
  const [examId, setExamId] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [questionText, setQuestionText] = useState<string>("");
  const [optionAText, setOptionAText] = useState<string>("");
  const [optionBText, setOptionBText] = useState<string>("");
  const [optionCText, setOptionCText] = useState<string>("");
  const [optionDText, setOptionDText] = useState<string>("");
  const [correctOption, setCorrectOption] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { toast } = useToast();

  const selectedExam = exams.find(e => e.id === examId);
  const subjectsForSelectedExam = selectedExam ? selectedExam.subjects : [];

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

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
    
    const newQuestionId = `${examId}-${subjectId}-${year}-${Date.now()}`;
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
      // In a real app, imageUrl would be the URL from Firebase Storage after upload
      imageUrl: imageFile ? `placeholder_for_${imageFile.name}` : undefined, 
    };

    console.log("New Question Data:", questionData);
    if (imageFile) {
      console.log("Selected Image File:", {
        name: imageFile.name,
        type: imageFile.type,
        size: imageFile.size,
      });
    }


    toast({
      title: "Question Data Logged",
      description: "Question data (and image file info if selected) has been logged to the console. Backend submission not yet implemented.",
    });

    // Reset form (optional)
    // setExamId(""); setSubjectId(""); setYear(""); setQuestionText(""); 
    // setOptionAText(""); setOptionBText(""); setOptionCText(""); setOptionDText("");
    // setCorrectOption(""); setImageFile(null); setImagePreview(null);
  };

  return (
    <Card className="shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
            <UploadCloud className="mr-3 h-6 w-6 text-primary" />
            Upload New Question
        </CardTitle>
        <CardDescription>
          Fill in the details below to add a new past question. Fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="upload-examId">Exam*</Label>
              <Select value={examId} onValueChange={setExamId}>
                <SelectTrigger id="upload-examId" className="mt-1">
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
              <Label htmlFor="upload-subjectId">Subject*</Label>
              <Select value={subjectId} onValueChange={setSubjectId} disabled={!selectedExam}>
                <SelectTrigger id="upload-subjectId" className="mt-1">
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
            <Label htmlFor="upload-year">Year*</Label>
            <Input
              id="upload-year"
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
            <Label htmlFor="upload-questionText">Question Text*</Label>
            <Textarea
              id="upload-questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter the full question text here..."
              className="mt-1"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="upload-questionImage">Question Image (Optional)</Label>
            <div className="mt-1 flex items-center gap-4">
                <Input
                id="upload-questionImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
                />
                <ImagePlus className="h-6 w-6 text-muted-foreground" />
            </div>
            {imagePreview && (
              <div className="mt-3 relative w-32 h-32 border rounded-md overflow-hidden shadow-sm">
                <img src={imagePreview} alt="Selected image preview" className="object-contain w-full h-full" />
              </div>
            )}
          </div>


          <div className="space-y-4">
            <Label>Options*</Label>
            <Input id="upload-optionA" value={optionAText} onChange={(e) => setOptionAText(e.target.value)} placeholder="Option A text (Required)" />
            <Input id="upload-optionB" value={optionBText} onChange={(e) => setOptionBText(e.target.value)} placeholder="Option B text (Required)" />
            <Input id="upload-optionC" value={optionCText} onChange={(e) => setOptionCText(e.target.value)} placeholder="Option C text (Optional)" />
            <Input id="upload-optionD" value={optionDText} onChange={(e) => setOptionDText(e.target.value)} placeholder="Option D text (Optional)" />
          </div>
          
          <div>
            <Label htmlFor="upload-correctOption">Correct Option*</Label>
            <Select value={correctOption} onValueChange={setCorrectOption}>
              <SelectTrigger id="upload-correctOption" className="mt-1">
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
       <Alert variant="default" className="mt-6 mx-6 mb-6 bg-blue-50 border-blue-300 text-blue-700">
        <AlertTriangle className="h-5 w-5 !text-blue-600" />
        <AlertTitle className="font-semibold">Next Steps & Image Uploading</AlertTitle>
        <AlertDescription>
          This form currently logs the question data (including image file details if selected) to the browser console.
          To make this fully functional:
          <ul className="list-disc list-inside mt-2">
            <li>Connect to a backend (e.g., Firebase Cloud Function) to save text data to Firestore.</li>
            <li>For images, the backend function would also need to:
                <ol className="list-decimal list-inside ml-4">
                    <li>Receive the image file.</li>
                    <li>Upload it to a storage service (like Firebase Storage).</li>
                    <li>Get the public URL of the stored image.</li>
                    <li>Save this URL along with the question text in Firestore.</li>
                </ol>
            </li>
            <li>Update question display pages to fetch data from Firestore.</li>
          </ul>
        </AlertDescription>
      </Alert>
    </Card>
  );
}
