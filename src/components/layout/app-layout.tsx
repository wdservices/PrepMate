
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
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutGrid, BarChart3, Settings, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/insights', label: 'Smart Analysis', icon: BarChart3 },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

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
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label} // Tooltip for collapsed state
                      className="justify-start"
                    >
                      <Link href={item.href}>
                        <item.icon className="flex-shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            {/* Optional SidebarFooter here */}
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
