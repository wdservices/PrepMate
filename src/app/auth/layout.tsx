
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image 
              src="/prepmate_logo.png" 
              alt="PrepMate Logo" 
              width={40} 
              height={40} 
              className="flex-shrink-0"
            />
            <span className="text-3xl font-bold text-foreground">{siteConfig.name}</span>
          </Link>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-lg sm:p-8">
          {children}
        </div>
         <p className="mt-6 text-center text-sm text-muted-foreground">
          Return to{' '}
          <Link href="/" className="font-medium text-primary hover:underline">
            Homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
