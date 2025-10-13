"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, AlertTriangle, ImagePlus, Copy } from 'lucide-react';
import { examService, type Exam } from '@/lib/firestore-service';
import type { Question, QuestionOption } from '@/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { questionService } from "@/lib/firestore-service";
import { storageService } from "@/lib/firebase-service";

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
  const [exams, setExams] = useState<Exam[]>([]);
  const { toast } = useToast();

  const staticSubjects = [
    { id: "english-language", name: "English Language" },
    { id: "literature-in-english", name: "Literature in English" },
    { id: "mathematics", name: "Mathematics" },
    { id: "further-mathematics", name: "Further Mathematics" },
    { id: "biology", name: "Biology" },
    { id: "chemistry", name: "Chemistry" },
    { id: "physics", name: "Physics" },
    { id: "economics", name: "Economics" },
    { id: "geography", name: "Geography" },
    { id: "history", name: "History" },
    { id: "government", name: "Government" },
    { id: "civic-education", name: "Civic Education" },
    { id: "agricultural-science", name: "Agricultural Science" },
    { id: "computer-science", name: "Computer Science" },
    { id: "technical-drawing", name: "Technical Drawing" },
    { id: "fine-art", name: "Fine Art" },
    { id: "music", name: "Music" },
    { id: "french", name: "French" },
    { id: "yoruba", name: "Yoruba" },
    { id: "igbo", name: "Igbo" },
    { id: "hausa", name: "Hausa" },
    { id: "commerce", name: "Commerce" },
    { id: "accounting", name: "Accounting" },
    { id: "christian-religious-studies", name: "Christian Religious Studies" },
    { id: "islamic-religious-studies", name: "Islamic Religious Studies" },
  ];

  // Load exams from Firestore
  useEffect(() => {
    const loadExams = async () => {
      try {
        const examsData = await examService.getAllExams();
        setExams(examsData);
      } catch (error) {
        console.error('Error loading exams:', error);
      }
    };
    loadExams();
  }, []);

  const selectedExam = exams.find(e => e.id === examId);
  const subjectsForSelectedExam = staticSubjects;

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
    
    let imageUrl: string | undefined = undefined;
    if (imageFile) {
      try {
        toast({
          title: "Uploading Image",
          description: "Please wait while the image is being uploaded...",
        });
        imageUrl = await storageService.uploadImage(imageFile, `question_images/${imageFile.name}`);
        toast({
          title: "Image Uploaded",
          description: "Image uploaded successfully!",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({
          title: "Image Upload Failed",
          description: "There was an error uploading the image. Please try again.",
          variant: "destructive",
        });
        return;
      }
    }

    const newQuestionId = `${subjectId.toLowerCase()}-${year}-${Date.now().toString().slice(-5)}`;
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
            description: "The selected correct option is not available or not filled in.",
            variant: "destructive",
        });
        return;
    }

    const questionData: Question = {
      id: newQuestionId,
      year: parseInt(year),
      text: questionText,
      options: options,
      correctOptionId: actualCorrectOptionId,
      imageUrl: imageUrl, 
    };

    try {
      await questionService.addQuestion(examId, subjectId, questionData);
      toast({
        title: "Question Uploaded!",
        description: "The question has been successfully uploaded to Firestore.",
      });
      // Reset form
      setExamId("");
      setSubjectId("");
      setYear("");
      setQuestionText("");
      setOptionAText("");
      setOptionBText("");
      setOptionCText("");
      setOptionDText("");
      setCorrectOption("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error uploading question:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading the question to Firestore. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
            <UploadCloud className="mr-3 h-6 w-6 text-primary" />
            Upload Question to Firestore
        </CardTitle>
        <CardDescription>
          Fill in the details to upload a new past question directly to Firestore.
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
                <img src={imagePreview} alt="Selected image preview" className="object-contain w-full h-full" data-ai-hint="diagram chart" />
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
          <Button type="submit" size="lg">
            <UploadCloud className="mr-2 h-5 w-5" />
            Upload Question to Firestore
          </Button>
        </CardFooter>
      </form>
       <Alert variant="default" className="mt-6 mx-6 mb-6 bg-blue-50 border-blue-300 text-blue-700">
        <AlertTriangle className="h-5 w-5 !text-blue-600" />
        <AlertTitle className="font-semibold">How to Upload Questions to Firestore</AlertTitle>
        <AlertDescription>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Fill out the form above and click "Upload Question to Firestore".</li>
            <li>The question will be directly uploaded to your Firestore database under the selected Exam and Subject.</li>
            <li>If you included an image, it will be uploaded to Firebase Storage, and its URL will be saved with the question.</li>
            <li>After successful upload, the form will reset, and you can add another question.</li>
            <li>You can verify the upload by checking your Firestore database or navigating to the relevant exam/subject/year in the application.</li>
          </ol>
        </AlertDescription>
      </Alert>

      {/* Removed generatedJson display section */}
    </Card>
  );
}

    