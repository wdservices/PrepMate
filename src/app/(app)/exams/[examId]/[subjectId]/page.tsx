
"use client"; // Needs to be client component for hooks like useParams

import Link from 'next/link';
import { useParams, notFound, useRouter } from 'next/navigation'; // Using useRouter for potential redirects
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, ChevronLeft, Loader2, AlertTriangle } from 'lucide-react';
import { getSubjectByIdFromFirestore, getExamByIdFromFirestore } from '@/lib/firebase-service';
import type { FirestoreSubjectData, FirestoreExamData } from '@/types';
// import type { Metadata } from 'next'; // Metadata generation moved to dynamic function

// Dynamic metadata generation is not directly supported in client components in the same way.
// We can set document.title in useEffect.
// For full SSR metadata, this page would need to be a Server Component or use generateMetadata from parent.

export default function SubjectYearsPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;
  const subjectId = params.subjectId as string;

  const [exam, setExam] = useState<FirestoreExamData | null>(null);
  const [subject, setSubject] = useState<FirestoreSubjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!examId || !subjectId) {
        setError("Exam ID or Subject ID is missing.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        console.log(`[SubjectYearsPage] Fetching exam (${examId}) and subject (${subjectId}) details...`);
        const [examData, subjectData] = await Promise.all([
          getExamByIdFromFirestore(examId),
          getSubjectByIdFromFirestore(examId, subjectId)
        ]);

        if (!examData) {
          console.warn(`[SubjectYearsPage] Exam with ID ${examId} not found.`);
          setError(`Exam "${examId}" not found.`);
        }
        if (!subjectData) {
          console.warn(`[SubjectYearsPage] Subject with ID ${subjectId} for exam ${examId} not found.`);
          setError(prevError => prevError ? `${prevError} Subject "${subjectId}" not found.` : `Subject "${subjectId}" not found.`);
        }
        
        setExam(examData);
        setSubject(subjectData);

        if (examData && subjectData) {
          document.title = `Years for ${subjectData.name} - ${examData.name} | PrepMate`;
        } else if (examData) {
           document.title = `Subject Not Found - ${examData.name} | PrepMate`;
        } else {
           document.title = `Exam/Subject Not Found | PrepMate`;
        }

      } catch (err: any) {
        console.error("[SubjectYearsPage] Error loading exam or subject data:", err);
        setError("Failed to load page data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [examId, subjectId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Loading Available Years...</h2>
        <p className="text-muted-foreground max-w-md">Fetching details for the selected subject.</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-3xl font-semibold mb-3 text-destructive">Error Loading Page</h2>
        <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
         <Button asChild className="ml-2">
            <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }
  
  if (!exam || !subject) {
    // This case should ideally be covered by the error state after loading,
    // but as a fallback if error isn't set but data is null.
    return notFound(); // Use Next.js notFound for clearer 404.
  }

  return (
    <div className="space-y-8">
      <div>
        <Button variant="outline" asChild className="mb-4">
          <Link href={`/exams/${exam.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to {exam.name} Subjects
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {subject.name} - {exam.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Select a year to view past questions.
        </p>
      </div>

      {subject.availableYears && subject.availableYears.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subject.availableYears.sort((a,b) => b - a).map((year) => ( 
            <Card key={year} className="overflow-hidden rounded-lg shadow transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <CardHeader className="p-4 border-b">
                <CardTitle className="flex items-center text-xl font-semibold">
                  <CalendarDays className="mr-3 h-6 w-6 text-primary" />
                  Year {year}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Button asChild className="w-full">
                  <Link href={`/exams/${exam.id}/${subject.id}/${year}`}>
                    View Questions <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
         <div className="text-center py-10 bg-card rounded-lg shadow">
          <CalendarDays className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No past questions available for {subject.name} yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Available years may not be configured for this subject in Firestore.</p>
        </div>
      )}
    </div>
  );
}
