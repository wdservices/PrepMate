"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExamCard } from '@/components/ui/exam-card';
import { examService } from '@/lib/firestore-service';
import { Exam } from '@/lib/firestore-service';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadExams = async () => {
      try {
        console.log('[Dashboard] Fetching exams...');
        const examsList = await examService.getAllExams();
        console.log('[Dashboard] Fetched exams:', examsList);
        setExams(examsList);
        setError(null);
      } catch (err) {
        console.error('[Dashboard] Error loading exams:', err);
        setError('Failed to load exams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadExams();
  }, []);

  const handleExamClick = (examId: string) => {
    router.push(`/exams/${examId}/subjects`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading exams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg max-w-md">
          <h3 className="font-medium">Error loading exams</h3>
          <p className="text-sm mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <div className="bg-muted p-6 rounded-lg max-w-md">
          <h3 className="font-medium">No exams available</h3>
          <p className="text-muted-foreground text-sm mt-1">
            There are no exams available at the moment. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Available Exams</h1>
        <p className="text-muted-foreground mt-2">
          Select an exam to get started with your preparation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            id={exam.id}
            title={exam.name}
            description={exam.description || 'Click to view subjects'}
            iconName={exam.iconName || 'BookOpen'}
            onClick={() => handleExamClick(exam.id)}
          />
        ))}
      </div>
    </div>
  );
}
