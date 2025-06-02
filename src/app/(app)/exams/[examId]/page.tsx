
"use client"; // This page now needs client-side hooks

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'; // Removed notFound as it's for server components
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, Loader2, AlertTriangle } from 'lucide-react';
import { getExamById } from '@/data/mock-data';
import type { Exam } from '@/types'; // Import Exam type
// import type { Metadata } from 'next'; // Metadata cannot be used in client components directly
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/components/providers/firebase-provider';

export default function ExamSubjectsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading, userProfileLoading } = useAuth();

  const examId = params.examId as string;
  
  // State for the exam data and access status
  const [exam, setExam] = useState<Exam | null | undefined>(undefined); // undefined: loading, null: not found
  const [isAccessChecked, setIsAccessChecked] = useState(false);

  useEffect(() => {
    console.log("[ExamSubjectsPage] Fetching exam data for examId:", examId);
    const currentExam = getExamById(examId);
    setExam(currentExam); // Will be null if not found, or the exam object
    if (currentExam) {
      document.title = `${currentExam.name} Subjects | PrepMate`;
    } else {
      document.title = 'Exam Not Found | PrepMate';
    }
  }, [examId]);

  useEffect(() => {
    // This effect handles auth checks and redirection logic
    console.log(`[ExamSubjectsPage] Auth/Access Effect triggered. AuthLoading: ${authLoading}, UserProfileLoading: ${userProfileLoading}, User: ${!!user}, Exam State: ${exam === undefined ? 'loading' : (exam === null ? 'not found' : 'loaded')}`);

    if (authLoading || userProfileLoading || exam === undefined) {
      console.log("[ExamSubjectsPage] Auth/Profile/Exam data still loading. Waiting...");
      return; // Wait for auth, profile, and exam data to load
    }

    if (!user) {
      console.log("[ExamSubjectsPage] No user detected after initial loads. Redirecting to login.");
      router.replace(`/auth/login?redirect=/exams/${examId}`);
      return;
    }

    // Log user details only if user object exists
    if (user) {
        console.log("[ExamSubjectsPage] User object available:", { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName,
        trialEndsAt: user.trialEndsAt, 
        isSubscribed: user.isSubscribed 
        });
    }


    if (exam === null) { // Exam not found based on the state set above
      console.log(`[ExamSubjectsPage] Exam with ID ${examId} not found (from state). Redirecting to 404.`);
      router.replace('/404'); // Or a specific "exam not found" page
      return;
    }

    // --- Mocked Trial/Subscription Check ---
    const now = Date.now();
    
    // DEFAULTING TO EXPIRED TRIAL FOR EASIER TESTING OF PAYMENT PAGE REDIRECTION
    const MOCKED_TRIAL_ENDS_AT = user.trialEndsAt === undefined
                                 ? (now - (25 * 60 * 60 * 1000)) // Trial expired 25h ago (DEFAULTING TO EXPIRED)
                                 : user.trialEndsAt;

    const MOCKED_IS_SUBSCRIBED = user.isSubscribed === undefined 
                                 ? false // Default to not subscribed if undefined
                                 : user.isSubscribed;

    const trialExpired = now > MOCKED_TRIAL_ENDS_AT;

    console.log(`[ExamSubjectsPage] Trial/Subscription Check: Now: ${now}, MockedTrialEndsAt: ${MOCKED_TRIAL_ENDS_AT}, IsSubscribed: ${MOCKED_IS_SUBSCRIBED}, TrialExpired: ${trialExpired}`);

    if (trialExpired && !MOCKED_IS_SUBSCRIBED) {
      console.log("[ExamSubjectsPage] Trial expired and not subscribed. Redirecting to payment.");
      router.replace(`/payment?examId=${examId}&reason=trial_expired_or_not_subscribed`);
    } else {
      console.log("[ExamSubjectsPage] Access granted (Trial active or Subscribed). Setting isAccessChecked to true.");
      setIsAccessChecked(true); // Access granted or trial active
    }
  }, [user, authLoading, userProfileLoading, exam, examId, router]);


  // --- Loading States ---
  if (authLoading || userProfileLoading || exam === undefined || !isAccessChecked) {
    console.log(`[ExamSubjectsPage] Page is in LOADING state. Conditions: 
      authLoading: ${authLoading}, 
      userProfileLoading: ${userProfileLoading}, 
      exam === undefined: ${exam === undefined}, 
      !isAccessChecked: ${!isAccessChecked}`);
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Loading Exam Details...</h2>
        <p className="text-muted-foreground max-w-md">
          Please wait while we fetch exam information and check your access.
        </p>
      </div>
    );
  }

  // --- Exam Not Found (after loading and access check) ---
  if (!exam) { // This check handles if exam is null after loading attempts
    console.log("[ExamSubjectsPage] Exam object is null after loading. Displaying Exam Not Found.");
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Exam Not Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          The exam you are looking for could not be found.
        </p>
        <Button asChild>
          <Link href="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  // --- Render Exam Subjects ---
  console.log("[ExamSubjectsPage] Rendering exam subjects content.");
  return (
    <div className="space-y-8">
      <div>
        <Button variant="outline" asChild className="mb-4">
          <Link href="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Exams
          </Link>
        </Button>
        <div className="flex items-center gap-3">
            {exam.icon && <exam.icon className="h-10 w-10 text-primary flex-shrink-0" />}
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {exam.name} Subjects
            </h1>
        </div>
        <p className="mt-2 text-lg text-muted-foreground sm:ml-12">
          Select a subject to view available years and past questions.
        </p>
      </div>

      {exam.subjects.length > 0 ? (
         <ScrollArea className="h-[calc(100vh-20rem)] pr-4"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exam.subjects.map((subject) => {
                const SubjectIcon = subject.icon || ArrowRight; // Default icon
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
            <p className="text-xl text-muted-foreground">No subjects available for {exam.name} yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Please check back later or try another exam.</p>
        </div>
      )}
    </div>
  );
}
