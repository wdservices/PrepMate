
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, Loader2, AlertTriangle } from 'lucide-react';
import { getExamById, getSubjectById } from '@/data/mock-data-jamb'; // Use mock data functions
import type { Exam, Subject as AppSubject } from '@/types'; // Renamed Subject to AppSubject to avoid conflict
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/components/providers/firebase-provider';
import { getIconByName } from '@/lib/icon-map';

export default function ExamSubjectsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading, userProfileLoading } = useAuth();

  const examId = params.examId as string;
  
  const [exam, setExam] = useState<Exam | null>(null); // Use Exam type from mock-data
  const [subjects, setSubjects] = useState<AppSubject[]>([]); // Use AppSubject type
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAccessChecked, setIsAccessChecked] = useState(false); 

  useEffect(() => {
    function loadExamAndSubjects() {
      if (!examId) {
        setError("Exam ID is missing.");
        setIsLoadingPage(false);
        return;
      }
      setIsLoadingPage(true);
      setError(null);
      try {
        console.log(`[ExamSubjectsPage] Fetching exam details for ID: ${examId} from mock data`);
        const examData = getExamById(examId); 
        if (!examData) {
          console.warn(`[ExamSubjectsPage] Exam with ID ${examId} not found in mock data.`);
          setError("Exam not found in available mock data.");
          setExam(null);
        } else {
          setExam(examData);
          document.title = `${examData.name} Subjects | PrepMate`;
          console.log(`[ExamSubjectsPage] Fetching subjects for exam: ${examData.name} (ID: ${examId}) from mock data`);
          setSubjects(examData.subjects || []); // Subjects are part of the Exam type in mock-data
        }
      } catch (err: any) {
        console.error("[ExamSubjectsPage] Error loading exam or subjects from mock data:", err);
        setError("Failed to load exam details or subjects from mock data.");
        setExam(null);
      } finally {
        setIsLoadingPage(false);
      }
    }
    loadExamAndSubjects();
  }, [examId]);

  useEffect(() => {
    console.log(`[ExamSubjectsPage] Auth/Access Effect. AuthLoading: ${authLoading}, UserProfileLoading: ${userProfileLoading}, User: ${!!user}, Exam State: ${exam === undefined ? 'loading' : (exam === null && !isLoadingPage ? 'not found' : 'loaded')}`);
    
    if (authLoading || userProfileLoading || isLoadingPage) {
      console.log("[ExamSubjectsPage] Auth/Profile/Page data still loading. Waiting...");
      return;
    }

    if (!user) {
      console.log("[ExamSubjectsPage] No user detected. Redirecting to login.");
      router.replace(`/auth/login?redirect=/exams/${examId}`);
      return;
    }

    if (!isLoadingPage && exam === null) {
      console.log(`[ExamSubjectsPage] Exam with ID ${examId} resolved to null (not found). Error message should handle display.`);
    }

    console.log("[ExamSubjectsPage] Payment gateway check is TEMPORARILY BYPASSED (as Firestore is not used for this check).");
    setIsAccessChecked(true); 

  }, [user, authLoading, userProfileLoading, exam, examId, router, isLoadingPage]);

  if (authLoading || userProfileLoading || isLoadingPage || !isAccessChecked) {
     console.log(`[ExamSubjectsPage] Page is in LOADING state. Conditions: 
      authLoading: ${authLoading}, 
      userProfileLoading: ${userProfileLoading}, 
      isLoadingPage: ${isLoadingPage},
      !isAccessChecked: ${!isAccessChecked}`);
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Loading Exam Details...</h2>
        <p className="text-muted-foreground max-w-md">
          Please wait while we fetch exam information.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-3xl font-semibold mb-3 text-destructive">Error</h2>
        <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }
  
  if (!exam) { 
    console.log("[ExamSubjectsPage] Exam object is null after loading. Displaying Exam Not Found.");
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Exam Not Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          The exam you are looking for (ID: {examId}) could not be found in the mock data.
        </p>
        <Button asChild>
          <Link href="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }
  
  const ExamIcon = exam.icon || getIconByName(exam.iconName); // Use direct icon or lookup by name

  console.log("[ExamSubjectsPage] Rendering exam subjects content for:", exam.name);
  return (
    <div className="space-y-8">
      <div>
        <Button variant="outline" asChild className="mb-4">
          <Link href="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Exams
          </Link>
        </Button>
        <div className="flex items-center gap-3">
            <ExamIcon className="h-10 w-10 text-primary flex-shrink-0" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {exam.name} Subjects
            </h1>
        </div>
        <p className="mt-2 text-lg text-muted-foreground sm:ml-12">
          Select a subject to view available years and past questions.
        </p>
      </div>

      {subjects.length > 0 ? (
         <ScrollArea className="h-[calc(100vh-20rem)] pr-4"> 
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
                const SubjectIcon = subject.icon || getIconByName(subject.iconName);
                return (
                <Card key={subject.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl">
                    <CardHeader className="p-5 border-b">
                    <div className="flex items-center space-x-3">
                        <SubjectIcon className="h-8 w-8 text-primary" />
                        <CardTitle className="text-xl font-semibold text-primary">{subject.name}</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-5">
                    <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                        {subject.description || `Practice past questions for ${subject.name}.`}
                    </CardDescription>
                    </CardContent>
                    <CardFooter className="p-5 pt-0 border-t">
                    <Button asChild className="w-full" size="lg" variant="default">
                        <Link href={`/exams/${exam.id}/${subject.id}`}>
                        View Years ({subject.availableYears.length})
                        <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    </CardFooter>
                </Card>
                );
            })}
            </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg shadow-md">
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No subjects available for {exam.name} in mock data.</p>
            <p className="text-sm text-muted-foreground mt-2">Please check back later or add subjects for this exam in the mock data file.</p>
        </div>
      )}
    </div>
  );
}
