
import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { ProtectedRoute } from './protected-route';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          © {new Date().getFullYear()} ExamAI Prep. All rights reserved.
        </footer>
      </div>
    </ProtectedRoute>
  );
}
