
"use client"; // This page now needs client-side hooks

import Link from 'next/link';
import { useParams, useRouter, notFound } from 'next/navigation'; // Added useParams and useRouter
import { useEffect, useState } from 'react'; // Added useEffect and useState
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, Loader2, AlertTriangle } from 'lucide-react';
import { getExamById } from '@/data/mock-data';
// import type { Metadata } from 'next'; // Metadata cannot be used in client components directly
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/components/providers/firebase-provider'; // Import useAuth

// Metadata generation should be handled by a Server Component layout if needed,
// or by setting document.title in useEffect for client components.
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const exam = getExamById(params.examId);
//   if (!exam) {
//     return { title: 'Exam Not Found' };
//   }
//   return { title: `${exam.name} Subjects` };
// }

export default function ExamSubjectsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading, userProfileLoading } = useAuth(); // Get user and loading state

  const examId = params.examId as string;
  const exam = getExamById(examId);

  const [isAccessChecked, setIsAccessChecked] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined' && exam) {
      document.title = `${exam.name} Subjects | PrepMate`;
    } else if (typeof document !== 'undefined' && !exam) {
      document.title = 'Exam Not Found | PrepMate';
    }
  }, [exam]);

  useEffect(() => {
    if (authLoading || userProfileLoading) {
      return; // Wait for auth and profile to load
    }

    if (!user) {
      router.replace(`/auth/login?redirect=/exams/${examId}`);
      return;
    }

    // --- Mocked Trial/Subscription Check ---
    // In a real app, these values would come from user.trialEndsAt, user.isSubscribed, etc.
    // which would be populated from Firestore via FirebaseProvider.
    const now = Date.now();
    const MOCKED_TRIAL_ENDS_AT = user.trialEndsAt || (now - (25 * 60 * 60 * 1000)); // Example: trial ended 1 hour ago if not set
    const MOCKED_IS_SUBSCRIBED = user.isSubscribed || false;
    
    const trialExpired = now > MOCKED_TRIAL_ENDS_AT;

    if (trialExpired && !MOCKED_IS_SUBSCRIBED) {
      router.replace(`/payment?examId=${examId}&reason=trial_expired`);
    } else {
      setIsAccessChecked(true); // Access granted or trial active
    }
  }, [user, authLoading, userProfileLoading, examId, router]);

  if (authLoading || userProfileLoading || !isAccessChecked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading exam details...</p>
      </div>
    );
  }
  
  if (!exam) {
    // This should ideally call Next.js notFound() but that's for server components.
    // For client components, a redirect or custom message is more common.
    // Since `notFound()` from next/navigation is for Server Components,
    // we'll render a message and redirect.
    useEffect(() => {
        router.replace('/404'); // Or a more specific "exam not found" page
    }, [router]);

    return (
         <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
            <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
            <h2 className="text-3xl font-semibold mb-3">Exam Not Found</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
            The exam you are looking for ({examId}) could not be found. You will be redirected.
            </p>
        </div>
    );
  }


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" asChild className="mb-4">
            <Link href="/dashboard">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Exams
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {exam.name} Subjects
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Choose a subject to start practicing with past questions.
          </p>
        </div>
      </div>

      {exam.subjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {exam.subjects.map((subject) => {
            const SubjectIcon = subject.icon;
            return (
              <Card key={subject.id} className="flex flex-col overflow-hidden rounded-lg shadow transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <CardHeader className="flex flex-row items-center space-x-3 p-4 border-b">
                  {SubjectIcon && <SubjectIcon className="h-8 w-8 text-primary flex-shrink-0" />}
                  <CardTitle className="text-xl font-semibold">{subject.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardDescription className="text-sm text-muted-foreground min-h-[4.5em] line-clamp-3">
                    {subject.description || `Past questions and study materials for ${subject.name}.`}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <Button asChild className="w-full">
                    <Link href={`/exams/${exam.id}/${subject.id}`}>
                      View Years <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <p className="text-xl text-muted-foreground">No subjects available for {exam.name} at the moment.</p>
           <p className="text-sm text-muted-foreground mt-2">Please check back later as we are actively updating our content.</p>
        </div>
      )}
    </div>
  );
}
