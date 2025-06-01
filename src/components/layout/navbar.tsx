
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings as SettingsIcon, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "@/components/providers/firebase-provider"; 
import { auth as firebaseAuth } from "@/lib/firebase"; 
import { signOut } from "firebase/auth"; 
import { useRouter } from "next/navigation";
import Link from "next/link"; 


export function Navbar() {
  const { user, loading } = useAuth(); 
  const router = useRouter(); 

  const handleSignOut = async () => { 
    if (firebaseAuth) {
      try {
        await signOut(firebaseAuth);
        router.push("/auth/login"); 
      } catch (error) {
        console.error("Sign out error:", error);
        // Optionally, show a toast message for sign-out failure
      }
    } else {
       // Fallback if firebaseAuth is somehow null, though unlikely if user is logged in
       router.push("/auth/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <SidebarTrigger /> 
        </div>
        
        <nav className="flex items-center gap-4">
          {!loading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage 
                      src={user.photoURL || `https://placehold.co/100x100.png?text=${user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}`} 
                      alt={user.displayName || user.email || "User"} />
                    <AvatarFallback>{user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none truncate">{user.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !loading && !user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </div>
          ) : (
            // Optional: Show a loading skeleton or nothing while loading
            <div className="h-10 w-20"></div> // Placeholder to prevent layout shift
          )}
        </nav>
      </div>
    </header>
  );
}
