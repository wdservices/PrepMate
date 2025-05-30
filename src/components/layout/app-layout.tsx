
import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { ProtectedRoute } from './protected-route';
import { siteConfig } from '@/config/site';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </footer>
      </div>
    </ProtectedRoute>
  );
}
