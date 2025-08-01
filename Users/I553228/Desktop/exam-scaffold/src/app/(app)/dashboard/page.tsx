"use client"; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Loader2, AlertTriangle } from 'lucide-react';
import { getExamsFromFirestore } from '@/lib/firebase-service';
import { getIconByName } from '@/lib/icon-map';
import type { FirestoreExamData } from '@/types'; 

export default function DashboardPage() {
  const [exams, setExams] = useState<FirestoreExamData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExams() {
      setIsLoading(true);
      setError(null);
      try {
        console.log("[DashboardPage] Fetching exams from Firestore...");
        const examsData = await getExamsFromFirestore();
        console.log("[DashboardPage] Exams fetched successfully:", examsData);
        setExams(examsData);
      } catch (err: any) {
        console.error("[DashboardPage] Error fetching exams from Firestore:", err);
        setError("Failed to load exams from the database. Please check your Firestore setup and security rules.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchExams();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Loading Exams...</h2>
        <p className="text-muted-foreground max-w-md">
          Please wait while we fetch the available exams from our database.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-3xl font-semibold mb-3 text-destructive">Error Loading Exams</h2>
        <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to PrepMate
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Your AI-powered guide to acing your exams. Select an exam to get started.
        </p>
      </div>

      {exams.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => {
            const ExamIcon = getIconByName(exam.iconName);
            return (
              <Card key={exam.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl">
                <CardHeader className="p-5 border-b">
                  <div className="flex items-center space-x-3">
                    <ExamIcon className="h-10 w-10 text-primary" />
                    <CardTitle className="text-2xl font-semibold text-primary">{exam.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardDescription className="mt-2 text-base text-muted-foreground">
                    {exam.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/exams/${exam.id}`}>
                      <BookOpen className="mr-2 h-5 w-5" />
                      View Subjects
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center p-6 bg-card rounded-xl shadow-md">
          <AlertTriangle className="h-16 w-16 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold mb-3 text-muted-foreground">No Exams Found</h2>
          <p className="text-muted-foreground max-w-md">
            It seems there are no exams configured in the database. An administrator needs to add exam documents to the 'exams' collection in Firestore.
          </p>
        </div>
      )}
    </div>
  );
}
