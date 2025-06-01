
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/providers/firebase-provider';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { Loader2, BookOpen, Brain, MessageSquare, LogIn, UserPlus, Sparkles, ArrowRight } from 'lucide-react';

// Client components cannot export metadata directly.
// For SEO on the landing page, consider a server component wrapper or general metadata in RootLayout.

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-foreground">Loading PrepMate...</p>
      </div>
    );
  }

  // If user is not loading and not logged in, show the landing page.
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">{siteConfig.name}</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <Sparkles className="mx-auto h-16 w-16 text-primary mb-6 animate-pulse" />
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Welcome to <span className="text-primary">{siteConfig.name}</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl md:text-2xl">
              {siteConfig.description} Ace your JAMB, WAEC, and NECO exams with our AI-powered study tools, comprehensive past questions, and smart analytics.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/auth/sign-up">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </div>
             <div className="mt-16">
              <Image 
                src="https://placehold.co/1200x600.png" 
                alt="PrepMate Dashboard Preview" 
                width={1200} 
                height={600}
                className="rounded-xl shadow-2xl mx-auto"
                data-ai-hint="app dashboard interface"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Choose PrepMate?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Everything you need to succeed in your exams, all in one place.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="Extensive Past Questions"
                description="Practice with thousands of real past questions from JAMB, WAEC, and NECO across various subjects and years."
              />
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="Smart Analysis & Insights"
                description="Leverage AI to identify frequently asked questions, predict potential topics, and understand your strengths and weaknesses."
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-primary" />}
                title="AI Academic Tutor"
                description="Get instant help with difficult concepts, ask questions, and receive personalized explanations from our AI tutor."
              />
              <FeatureCard
                imageSrc="https://placehold.co/600x400.png"
                imageAlt="Progress Tracking Illustration"
                dataAiHint="study progress graph"
                title="Track Your Progress"
                description="Monitor your performance, review your answers, and see how you improve over time with detailed analytics."
              />
               <FeatureCard
                imageSrc="https://placehold.co/600x400.png"
                imageAlt="Exam Simulation Interface"
                dataAiHint="exam interface computer"
                title="Realistic Exam Simulation"
                description="Experience exam conditions with timed tests and a familiar interface to build confidence and reduce anxiety."
              />
               <FeatureCard
                imageSrc="https://placehold.co/600x400.png"
                imageAlt="Personalized Study Plan Example"
                dataAiHint="study plan checklist"
                title="Personalized Study Plans"
                description="Get tailored recommendations and study schedules based on your performance and target exams, optimized by AI."
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gradient-to-t from-background via-secondary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Start Your Journey to Success?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Join thousands of students already using PrepMate to achieve their academic goals. Don't just study, study smart!
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg">
                <Link href="/auth/sign-up">
                  Sign Up Now and Ace Your Exams!
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/60 bg-background">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold text-foreground">{siteConfig.name}</span>
          </Link>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Empowering students for a brighter future with AI.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper component for feature cards
interface FeatureCardProps {
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  dataAiHint?: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, imageSrc, imageAlt, dataAiHint, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-6 text-center bg-card rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      {icon && (
        <div className="mb-5 flex items-center justify-center rounded-full bg-primary/10 p-4">
          {icon}
        </div>
      )}
      {imageSrc && imageAlt && (
         <Image 
            src={imageSrc} 
            alt={imageAlt} 
            width={600} 
            height={400} 
            className="rounded-lg mb-5 object-cover w-full h-48 shadow-md"
            data-ai-hint={dataAiHint || "feature image"}
          />
      )}
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
