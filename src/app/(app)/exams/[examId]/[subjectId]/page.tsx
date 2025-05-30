
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, ChevronLeft } from 'lucide-react';
import { getSubjectById, getExamById } from '@/data/mock-data';
import type { Metadata } from 'next';

type Props = {
  params: { examId: string; subjectId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exam = getExamById(params.examId);
  const subject = getSubjectById(params.examId, params.subjectId);
  if (!exam || !subject) {
    return { title: 'Subject Not Found' };
  }
  return { title: `Years for ${subject.name} - ${exam.name}` };
}

export default function SubjectYearsPage({ params }: Props) {
  const exam = getExamById(params.examId);
  const subject = getSubjectById(params.examId, params.subjectId);

  if (!exam || !subject) {
    notFound();
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

      {subject.availableYears.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subject.availableYears.sort((a,b) => b - a).map((year) => ( // Sort years descending
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
          <p className="text-xl text-muted-foreground">No past questions available for {subject.name} ({year}) yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Please check back later or try another subject/year.</p>
        </div>
      )}
    </div>
  );
}
