
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Temporarily disabled
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"; // Temporarily disabled
// import { LogOut, Settings as SettingsIcon } from "lucide-react"; // Icons for dropdown, SettingsIcon renamed to avoid conflict
// import { useAuth } from "@/components/providers/firebase-provider"; // Temporarily disabled
// import { auth as firebaseAuth } from "@/lib/firebase"; // firebaseAuth can be null
// import { signOut } from "firebase/auth"; // Temporarily disabled
import { useRouter } from "next/navigation";
// import { siteConfig } from "@/config/site"; // Site name is now in SidebarHeader
// import Link from "next/link"; // Link for site name removed
// import { Sparkles } from "lucide-react"; // Sparkles for site name removed


export function Navbar() {
  // const { user } = useAuth(); // Temporarily disabled
  const router = useRouter(); // Keep router if needed for other nav items

  // const handleSignOut = async () => { // Temporarily disabled
  //   if (firebaseAuth) {
  //     await signOut(firebaseAuth);
  //   }
  //   router.push("/auth/login");
  // };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* SidebarTrigger for mobile and also for desktop if sidebar is collapsible */}
          <SidebarTrigger /> 
          {/* Site name/logo has moved to SidebarHeader */}
        </div>
        
        <nav className="flex items-center gap-4">
          {/* Primary navigation has moved to Sidebar */}
          {/* Auth-related UI is temporarily removed */}
          {/* {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src={user.photoURL || `https://placehold.co/100x100.png?text=${user.email?.[0]?.toUpperCase() || 'U'}`} alt={user.displayName || user.email || "User"} />
                    <AvatarFallback>{user.email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
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
          ) : (
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
          )} */}
        </nav>
      </div>
    </header>
  );
}
