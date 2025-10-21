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
  SidebarFooter, 
  SidebarSeparator, 
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutGrid, BarChart3, Sparkles, BotMessageSquare, BookOpen, Settings, Users, DollarSign, UploadCloud } from 'lucide-react'; 
import { usePathname } from 'next/navigation';
import { examService, type Exam } from '@/lib/firestore-service';
import { useState, useEffect } from 'react'; 

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExams = async () => {
      try {
        const examsList = await examService.getAllExams();
        setExams(examsList);
      } catch (error) {
        console.error('Failed to load exams:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExams();
  }, []);

  const adminNavItems = [
     { href: '/admin', label: 'Admin Dashboard', icon: Users, type: 'admin' as const },
     { href: '/admin/pricing', label: 'Price Management', icon: DollarSign, type: 'admin' as const },
     { href: '/admin/revenue', label: 'Revenue', icon: BarChart3, type: 'admin' as const },
     { href: '/admin/users', label: 'Users', icon: Users, type: 'admin' as const },
     { href: '/admin/settings', label: 'Admin Settings', icon: Settings, type: 'admin' as const },
     { href: '/admin/upload', label: 'Upload Content', icon: UploadCloud, type: 'admin' as const },
  ];

  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon" variant="sidebar" side="left" className="bg-sidebar text-sidebar-foreground">
            <SidebarHeader className="p-3 flex justify-center items-center h-16 border-b border-sidebar-border">
              <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                <Sparkles className="h-7 w-7 text-primary flex-shrink-0" />
                <span className="text-xl font-bold text-white group-data-[collapsible=icon]:hidden whitespace-nowrap">
                  {siteConfig.name}
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="flex-grow">
              <SidebarMenu>
                 {adminNavItems.map((item) => {
                  const isActive = pathname === item.href || (item.href === '/admin' && pathname?.startsWith('/admin/')); 
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
            </SidebarContent>
            
            <SidebarFooter className="mt-auto border-t border-sidebar-border">
              {/* Admin specific footer items can go here if needed */}
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