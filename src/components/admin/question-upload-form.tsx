
"use client";

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, AlertTriangle, ImagePlus, Copy } from 'lucide-react';
import { exams } from '@/data/mock-data-jamb';
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
  const [generatedJson, setGeneratedJson] = useState<string | null>(null);

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
    setGeneratedJson(null); // Clear previous JSON

    if (!examId || !subjectId || !year || !questionText || !optionAText || !optionBText || !correctOption) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields (Exam, Subject, Year, Question, Options A & B, Correct Option).",
        variant: "destructive",
      });
      return;
    }
    
    const newQuestionId = `${subjectId.toLowerCase()}-${year}-${Date.now().toString().slice(-5)}`; // More concise ID
    const options: QuestionOption[] = [];
    options.push({ id: "opt1", text: optionAText });
    options.push({ id: "opt2", text: optionBText });
    if (optionCText) options.push({ id: "opt3", text: optionCText });
    if (optionDText) options.push({ id: "opt4", text: optionDText });

    // Determine the correctOptionId based on selection (e.g., 'opt1', 'opt2')
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
      imageUrl: imageFile ? `/images/${imageFile.name}` : undefined, 
    };

    const jsonOutput = JSON.stringify(questionData, null, 2);
    setGeneratedJson(jsonOutput);

    console.log("--- COPY AND PASTE THIS JSON INTO src/data/mock-data-jamb.ts ---");
    console.log(`// For Exam: ${selectedExam?.name}, Subject: ${selectedExam?.subjects.find(s => s.id === subjectId)?.name}, Year: ${year}`);
    console.log(jsonOutput + ','); // Add comma for easy pasting into an array
    console.log("--------------------------------------------------------------");
    if (imageFile) {
      console.log(`IMPORTANT: Manually place the image '${imageFile.name}' into your 'public/images' folder.`);
    }


    toast({
      title: "Question JSON Generated!",
      description: "The question JSON has been logged to the console and is shown below. Copy it to add to your mock-data-jamb.ts file.",
      duration: 10000,
    });

    // Reset form (optional)
    // setExamId(""); setSubjectId(""); setYear(""); setQuestionText(""); 
    // setOptionAText(""); setOptionBText(""); setOptionCText(""); setOptionDText("");
    // setCorrectOption(""); setImageFile(null); setImagePreview(null);
  };

  const handleCopyToClipboard = () => {
    if (generatedJson) {
      navigator.clipboard.writeText(generatedJson + ',')
        .then(() => {
          toast({ title: "Copied to Clipboard!", description: "JSON (with trailing comma) copied." });
        })
        .catch(err => {
          toast({ title: "Copy Failed", description: "Could not copy to clipboard. Please copy from console.", variant: "destructive" });
          console.error('Failed to copy text: ', err);
        });
    }
  };


  return (
    <Card className="shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
            <UploadCloud className="mr-3 h-6 w-6 text-primary" />
            Generate Question for Mock Data
        </CardTitle>
        <CardDescription>
          Fill in the details to generate a JSON object for a new past question. You can then copy this JSON and manually add it to the <code>src/data/mock-data-jamb.ts</code> file.
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
            Generate Question JSON
          </Button>
        </CardFooter>
      </form>
       <Alert variant="default" className="mt-6 mx-6 mb-6 bg-blue-50 border-blue-300 text-blue-700">
        <AlertTriangle className="h-5 w-5 !text-blue-600" />
        <AlertTitle className="font-semibold">How to Add Generated Question to Mock Data</AlertTitle>
        <AlertDescription>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Fill out the form above and click "Generate Question JSON".</li>
            <li>The generated JSON for the question will appear below and also be logged in your browser's developer console.</li>
            <li>
                Click the "Copy JSON" button below (if it appears) or copy the JSON string directly from the console. 
                A comma will be automatically appended for easy pasting into an array.
            </li>
            <li>Open the file: <code>src/data/mock-data-jamb.ts</code>.</li>
            <li>
              Locate the correct array for the exam, subject, and year (e.g., <code>jambChemistry2010</code>, <code>waecBiology2011</code>). You might need to create the array if it doesn't exist (e.g., <code>const necoPhysics2020: Question[] = [];</code>).
            </li>
            <li>Paste the copied JSON object into the array. Ensure it's added as a new element, typically before the closing <code>];</code> bracket of the array.</li>
            <li>If you included an image:
                <ul className="list-disc list-inside ml-6 mt-1">
                    <li>Manually place the image file (e.g., <code>{imageFile ? imageFile.name : 'your-image.png'}</code>) into the <code>public/images/</code> folder in your project.</li>
                    <li>Ensure the <code>imageUrl</code> property in the pasted JSON correctly points to this image (e.g., <code>"/images/{imageFile ? imageFile.name : 'your-image.png'}"</code>).</li>
                </ul>
            </li>
            <li>Save the <code>mock-data-jamb.ts</code> file. Your application should hot-reload, and the new question will be available if you navigate to the correct exam/subject/year.</li>
          </ol>
        </AlertDescription>
      </Alert>

      {generatedJson && (
        <Card className="m-6 mt-0 shadow-md">
            <CardHeader>
                <CardTitle className="text-lg">Generated Question JSON</CardTitle>
                <CardDescription>Copy the JSON below to add to your <code>mock-data-jamb.ts</code> file.</CardDescription>
            </CardHeader>
            <CardContent>
                <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                    {generatedJson}
                </pre>
            </CardContent>
            <CardFooter>
                 <Button onClick={handleCopyToClipboard} variant="outline">
                    <Copy className="mr-2 h-4 w-4" /> Copy JSON (with comma)
                </Button>
            </CardFooter>
        </Card>
      )}
    </Card>
  );
}

    