
import Link from 'next/link';
import {notFound} from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { getExamById } from '@/data/mock-data';
import type { Metadata } from 'next';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  params: { examId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exam = getExamById(params.examId);
  if (!exam) {
    return { title: 'Exam Not Found' };
  }
  return { title: `${exam.name} Subjects` };
}

export default function ExamSubjectsPage({ params }: Props) {
  const exam = getExamById(params.examId);

  if (!exam) {
    notFound();
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
                  <CardDescription className="text-sm text-muted-foreground min-h-[4.5em] line-clamp-3"> {/* min-h and line-clamp for consistency */}
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
           {/* You can add an icon here like BookX or similar from lucide-react */}
          <p className="text-xl text-muted-foreground">No subjects available for {exam.name} at the moment.</p>
           <p className="text-sm text-muted-foreground mt-2">Please check back later as we are actively updating our content.</p>
        </div>
      )}
    </div>
  );
}

