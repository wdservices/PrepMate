
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/providers/firebase-provider';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { Loader2, BookOpen, Brain, MessageSquare, LogIn, UserPlus, Sparkles, ArrowRight, CheckCircle, Zap } from 'lucide-react';

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

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Vast Question Bank",
      description: "Access thousands of past questions for JAMB, WAEC, and NECO, spanning numerous subjects and years.",
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Insights",
      description: "Discover frequent topics, predict likely questions, and gain a deeper understanding of exam patterns with smart analytics.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Instant AI Tutor",
      description: "Get immediate, personalized explanations for complex concepts and questions from our intelligent academic assistant.",
    },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Sign Up & Start Trial",
      description: "Create your account in minutes and instantly unlock a 24-hour free trial with full access.",
      icon: <UserPlus className="h-7 w-7 text-secondary" />,
    },
    {
      step: 2,
      title: "Explore & Practice",
      description: "Dive into our extensive library of past questions. Filter by exam, subject, and year.",
      icon: <Zap className="h-7 w-7 text-secondary" />,
    },
    {
      step: 3,
      title: "Learn & Understand",
      description: "Utilize AI explanations for answers and chat with the AI tutor for deeper concept clarity.",
      icon: <Lightbulb className="h-7 w-7 text-secondary" />, // Assuming Lightbulb is a valid icon
    },
    {
      step: 4,
      title: "Succeed with Confidence",
      description: "Build your knowledge, master exam patterns, and approach your exams fully prepared.",
      icon: <CheckCircle className="h-7 w-7 text-secondary" />,
    },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-20 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-2xl font-semibold text-foreground tracking-tight">{siteConfig.name}</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" asChild className="text-sm sm:text-base">
              <Link href="/auth/login">
                <LogIn className="mr-1.5 h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button size="sm" asChild className="text-sm sm:text-base shadow-md">
              <Link href="/auth/sign-up">
                <UserPlus className="mr-1.5 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {/* Subtle background pattern - can be enhanced with SVG if possible */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-3xl opacity-50"></div>
          </div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-6" />
            <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Ace Your Exams with <span className="text-primary block sm:inline">{siteConfig.name}</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground md:text-xl">
              {siteConfig.description} Unlock your potential with AI-driven study tools and conquer your exams.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow duration-300 text-base px-8 py-6">
                <Link href="/auth/sign-up">
                  Start 24-Hour Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-12 sm:mt-16 md:mt-20 px-2 sm:px-0">
              <Image 
                src="https://placehold.co/1200x675.png" 
                alt="PrepMate Dashboard Preview" 
                width={1200} 
                height={675}
                className="rounded-xl shadow-2xl mx-auto ring-1 ring-border/30"
                data-ai-hint="app dashboard interface"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background/70 border-t border-b border-border/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Why PrepMate is Your Ultimate Study Partner
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                Leverage cutting-edge AI to transform your exam preparation.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-background to-blue-50/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Get Started in Minutes
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                Follow these simple steps to begin your journey to exam success.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorksSteps.map((item) => (
                <div key={item.step} className="bg-card p-6 rounded-xl shadow-lg border border-border/20 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-shrink-0 mb-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center ring-4 ring-secondary/20">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1.5">Step {item.step}: {item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-background mb-5 opacity-80" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Elevate Your Scores?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg opacity-90">
              Join thousands of students preparing smarter, not just harder. Your 24-hour free trial awaits!
            </p>
            <div className="mt-10">
              <Button 
                size="lg" 
                asChild 
                className="bg-background hover:bg-background/90 text-primary font-semibold px-10 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/auth/sign-up">
                  Claim Your Free 24-Hour Access
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-border/40 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold text-foreground">{siteConfig.name}</span>
          </Link>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            AI-Powered Exam Preparation for Nigerian Students.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper component for feature cards
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-lg border border-border/20 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-5">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

    