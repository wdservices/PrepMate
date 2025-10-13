import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QuestionUploadForm } from "@/components/admin/question-upload-form";
import { UploadCloud } from "lucide-react";

export function QuestionUploadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <UploadCloud className="h-5 w-5" />
          Upload Questions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Questions for Mock Data</DialogTitle>
          <DialogDescription>
            Fill in the details below to upload new questions.
          </DialogDescription>
        </DialogHeader>
        <QuestionUploadForm />
      </DialogContent>
    </Dialog>
  );
}