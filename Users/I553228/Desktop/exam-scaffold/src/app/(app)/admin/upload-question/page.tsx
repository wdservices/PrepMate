
import type { Metadata } from 'next';
import { QuestionUploadForm } from '@/components/admin/question-upload-form';

export const metadata: Metadata = {
  title: 'Upload Question',
};

export default function UploadQuestionPage() {
    return (
        <div>
            <QuestionUploadForm />
        </div>
    )
}
