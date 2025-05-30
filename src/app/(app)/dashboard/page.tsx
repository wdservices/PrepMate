
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Library, GraduationCap, BookOpenText, ClipboardCheck } from 'lucide-react'; // Added new icons
import { exams } from '@/data/mock-data'; // Import mock data

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => {
          const ExamIcon = exam.icon || Library; // Fallback to Library if no icon is specified
          return (
            <Card key={exam.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-2xl">
              <CardHeader className="p-6 bg-muted/30">
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
    </div>
  );
}
