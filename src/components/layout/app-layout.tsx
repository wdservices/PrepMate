
"use client";

import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { ProtectedRoute } from './protected-route';
import { siteConfig } from '@/config/site';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter, // Added SidebarFooter
  SidebarSeparator, // Added SidebarSeparator
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutGrid, BarChart3, Sparkles, BotMessageSquare, BookOpen, UploadCloud, Settings, Users } from 'lucide-react'; // Added Users icon
import { usePathname } from 'next/navigation';
import { exams } from '@/data/mock-data'; // Import exams data

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const mainNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid, type: 'static' as const },
    ...exams.map(exam => {
      const ExamIcon = exam.icon || BookOpen; // Fallback icon
      return {
        href: `/exams/${exam.id}`,
        label: exam.name,
        icon: ExamIcon,
        id: exam.id,
        type: 'exam' as const,
      };
    }),
    { href: '/insights', label: 'Smart Analysis', icon: BarChart3, type: 'static' as const },
    { href: '/ai-tutor', label: 'AI Tutor', icon: BotMessageSquare, type: 'static' as const },
  ];

  const adminNavItems = [
     { href: '/admin', label: 'Admin Dashboard', icon: Users, type: 'admin' as const }, // Changed icon, points to new dashboard
     { href: '/admin/upload-question', label: 'Upload Questions', icon: UploadCloud, type: 'admin' as const },
     // Add more admin links here later if needed
  ];

  const utilityNavItems = [
    { href: '/settings', label: 'Settings', icon: Settings, type: 'static' as const },
  ]

  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon" variant="sidebar" side="left" className="bg-sidebar text-sidebar-foreground">
            <SidebarHeader className="p-3 flex justify-center items-center h-16 border-b border-sidebar-border">
              <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                <Sparkles className="h-7 w-7 text-primary flex-shrink-0" />
                <span className="text-xl font-bold text-foreground group-data-[collapsible=icon]:hidden whitespace-nowrap">
                  {siteConfig.name}
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="flex-grow">
              <SidebarMenu>
                {mainNavItems.map((item) => {
                  let isActive = false;
                  if (item.type === 'exam') {
                    isActive = pathname.startsWith(item.href); 
                  } else if (item.href === '/dashboard') {
                    isActive = pathname === '/dashboard' || pathname === '/'; // Treat root as dashboard
                  } else {
                    isActive = pathname === item.href;
                  }
                  const ItemIcon = item.icon;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className="justify-start"
                      >
                        <Link href={item.href}>
                          <ItemIcon className="flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>

              {/* Admin Section - could be made conditional based on user role later */}
              {adminNavItems.length > 0 && (
                <>
                  <SidebarSeparator className="my-2" />
                  <SidebarMenu>
                     {adminNavItems.map((item) => {
                      const isActive = pathname === item.href || (item.href === '/admin' && pathname.startsWith('/admin/')); // Make admin dashboard link active for sub-routes too
                      const ItemIcon = item.icon;
                      return (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={item.label}
                            className="justify-start"
                          >
                            <Link href={item.href}>
                              <ItemIcon className="flex-shrink-0" />
                              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </>
              )}
            </SidebarContent>
            
            <SidebarFooter className="mt-auto border-t border-sidebar-border">
              <SidebarMenu>
                {utilityNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  const ItemIcon = item.icon;
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.label}
                          className="justify-start"
                        >
                          <Link href={item.href}>
                            <ItemIcon className="flex-shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                })}
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
              {children}
            </main>
            <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </footer>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
