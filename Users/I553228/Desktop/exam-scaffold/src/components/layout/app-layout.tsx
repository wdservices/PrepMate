
"use client";

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
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
import { LayoutGrid, BarChart3, Sparkles, BotMessageSquare, BookOpen, Settings, Users, Loader2 } from 'lucide-react'; 
import { usePathname } from 'next/navigation';
import { getExamsFromFirestore } from '@/lib/firebase-service';
import type { FirestoreExamData } from '@/types';
import { getIconByName } from '@/lib/icon-map';

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [exams, setExams] = useState<FirestoreExamData[]>([]);
  const [navLoading, setNavLoading] = useState(true);

  useEffect(() => {
    async function fetchNavExams() {
      setNavLoading(true);
      try {
        const examsData = await getExamsFromFirestore();
        setExams(examsData);
      } catch (error) {
        console.error("Failed to load exams for navigation:", error);
      } finally {
        setNavLoading(false);
      }
    }
    fetchNavExams();
  }, []);

  const adminNavItems = [
     { href: '/admin', label: 'Admin Dashboard', icon: Users, type: 'admin' as const },
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
                <span className="text-xl font-bold text-white group-data-[collapsible=icon]:hidden whitespace-nowrap">
                  {siteConfig.name}
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="flex-grow">
              <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Dashboard" className="justify-start">
                        <Link href="/dashboard"><LayoutGrid className="flex-shrink-0" /> <span className="group-data-[collapsible=icon]:hidden">Dashboard</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                {navLoading ? (
                    [...Array(3)].map((_, i) => (
                        <SidebarMenuItem key={i}><div className="flex items-center gap-2 p-2"><Loader2 className="h-4 w-4 animate-spin" /><span className="group-data-[collapsible=icon]:hidden">Loading...</span></div></SidebarMenuItem>
                    ))
                ) : (
                    exams.map((item) => {
                      const isActive = pathname.startsWith(`/exams/${item.id}`);
                      const ItemIcon = getIconByName(item.iconName);
                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton asChild isActive={isActive} tooltip={item.name} className="justify-start">
                            <Link href={`/exams/${item.id}`}><ItemIcon className="flex-shrink-0" /><span className="group-data-[collapsible=icon]:hidden">{item.name}</span></Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })
                )}

                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/insights'} tooltip="Smart Analysis" className="justify-start">
                        <Link href="/insights"><BarChart3 className="flex-shrink-0" /> <span className="group-data-[collapsible=icon]:hidden">Smart Analysis</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/ai-tutor'} tooltip="AI Tutor" className="justify-start">
                        <Link href="/ai-tutor"><BotMessageSquare className="flex-shrink-0" /> <span className="group-data-[collapsible=icon]:hidden">AI Tutor</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              {adminNavItems.length > 0 && (
                <>
                  <SidebarSeparator className="my-2" />
                  <SidebarMenu>
                     {adminNavItems.map((item) => {
                      const isActive = pathname === item.href || (item.href === '/admin' && pathname.startsWith('/admin/')); 
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
