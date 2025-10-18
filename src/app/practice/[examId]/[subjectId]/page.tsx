import { notFound } from 'next/navigation';
import { QuestionCard } from '@/components/questions/QuestionCard';
import { examService, type Question as FirestoreQuestion } from '@/lib/firestore-service';
import { QuestionOption } from '@/types';
import { QuestionViewer } from './question-viewer';

interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  answer: string;
  explanation?: string;
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ examId: string; subjectId: string }>;
}) {
  // Await params in Next.js 15
  const { examId, subjectId } = await params;
  
  // Get exam and subject data
  const [exam, subject] = await Promise.all([
    examService.getExamById(examId),
    examService.getSubjectById(examId, subjectId),
  ]);

  if (!exam || !subject) {
    notFound();
  }

  // Get all past questions for this subject across years
  const firestoreQuestions = await examService.getQuestionsBySubject(
    examId,
    subjectId
  );

  // Transform questions to match the expected format
  const questions: Question[] = firestoreQuestions.map(q => {
    const correctOption = q.options.find(opt => opt.id === q.correctOptionId);
    return {
      id: q.id,
      text: q.text,
      options: q.options, // Keep the original QuestionOption[] format
      answer: correctOption?.text || '',
      explanation: (q as any).explanation // Temporary type assertion
    };
  });

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-2xl font-bold mb-4">No Questions Available</h1>
        <p className="text-muted-foreground">
          There are no questions available for {subject.name} at this time.
        </p>
      </div>
    );
  }

  return <QuestionViewer initialQuestions={questions} exam={exam} subject={subject} />;
}
