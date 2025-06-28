
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, Loader2, AlertTriangle, Lock } from 'lucide-react';
import { getExamByIdFromFirestore, getSubjectsForExamFromFirestore } from '@/lib/firebase-service';
import type { FirestoreExamData, FirestoreSubjectData } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/components/providers/firebase-provider';
import { getIconByName } from '@/lib/icon-map';
import { Alert, AlertDescription, AlertTitle as AlertTitleComponent } from "@/components/ui/alert";

export default function ExamSubjectsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading, userProfileLoading } = useAuth();
  const examId = params.examId as string;
  
  const [exam, setExam] = useState<FirestoreExamData | null>(null);
  const [subjects, setSubjects] = useState<FirestoreSubjectData[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAccessChecked, setIsAccessChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function loadExamAndSubjects() {
      if (!examId) {
        setError("Exam ID is missing from the URL.");
        setIsLoadingPage(false);
        return;
      }
      setIsLoadingPage(true);
      setError(null);
      try {
        console.log(`[ExamSubjectsPage] Fetching exam details for ID: ${examId} from Firestore`);
        const examData = await getExamByIdFromFirestore(examId); 
        if (!examData) {
          setError("Exam not found in the database.");
        } else {
          setExam(examData);
          document.title = `${examData.name} Subjects | PrepMate`;
          const subjectsData = await getSubjectsForExamFromFirestore(examId);
          setSubjects(subjectsData);
        }
      } catch (err: any) {
        console.error("[ExamSubjectsPage] Error loading exam or subjects:", err);
        setError("Failed to load exam details from the database.");
      } finally {
        setIsLoadingPage(false);
      }
    }
    loadExamAndSubjects();
  }, [examId]);

  useEffect(() => {
    if (authLoading || userProfileLoading || isLoadingPage) {
      return; // Wait until all data is loaded
    }

    if (!user) {
      router.replace(`/auth/login?redirect=/exams/${examId}`);
      return;
    }

    // Check for access via trial or subscription
    const now = Date.now();
    const trialActive = user.trialEndsAt ? user.trialEndsAt > now : false;
    const subscriptionActive = user.isSubscribed && (user.subscriptionEndsAt ? user.subscriptionEndsAt > now : true);
    
    if (trialActive || subscriptionActive) {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
    
    setIsAccessChecked(true);

  }, [user, authLoading, userProfileLoading, exam, examId, router, isLoadingPage]);


  if (authLoading || userProfileLoading || isLoadingPage || !isAccessChecked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Loading Exam Details...</h2>
        <p className="text-muted-foreground max-w-md">
          Verifying access and fetching subjects from our database...
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
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Exam Not Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          The exam you are looking for (ID: {examId}) could not be found in the database.
        </p>
        <Button asChild>
          <Link href="/dashboard"><ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  if (!hasAccess) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
            <Card className="max-w-lg shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-destructive flex items-center justify-center">
                        <Lock className="mr-3 h-7 w-7"/> Access Required
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-2">
                        Your trial period has ended.
                    </p>
                    <p className="text-lg">
                        Please subscribe to get full access to all subjects, past questions, and AI features for the <strong>{exam.name}</strong> exam.
                    </p>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                     <Button asChild size="lg">
                        <Link href="/subscribe">Subscribe Now</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/dashboard"><ChevronLeft className="mr-2 h-4 w-4"/> Go to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
  }
  
  const ExamIcon = getIconByName(exam.iconName);

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
                const SubjectIcon = getIconByName(subject.iconName);
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
            <p className="text-xl text-muted-foreground">No subjects available for {exam.name}.</p>
            <p className="text-sm text-muted-foreground mt-2">The administrator needs to add subjects to this exam in the Firestore database.</p>
        </div>
      )}
    </div>
  );
}
