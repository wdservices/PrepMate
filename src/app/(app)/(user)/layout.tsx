
import { AppLayout } from '@/components/layout/app-layout';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ProtectedRoute } from '@/components/layout/protected-route';

// Add a generic title for authenticated pages, individual pages can override
export const metadata: Metadata = {
  title: 'PrepMate App', // Generic title for app sections
};

export default function AuthenticatedAppLayout({ children }: { ReactNode }) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}
