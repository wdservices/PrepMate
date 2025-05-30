
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Temporarily disabled
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"; // Temporarily disabled
import { LayoutGrid, BarChart3, Sparkles } from "lucide-react"; // LogIn, LogOut, UserPlus, Settings, ShieldQuestion removed
// import { useAuth } from "@/components/providers/firebase-provider"; // Temporarily disabled
// import { auth as firebaseAuth } from "@/lib/firebase"; // firebaseAuth can be null
// import { signOut } from "firebase/auth"; // Temporarily disabled
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";

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
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">{siteConfig.name}</span>
        </Link>
        <nav className="flex items-center gap-4">
          {/* Always show Dashboard and Insights as auth is bypassed */}
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <LayoutGrid className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/insights">
              <BarChart3 className="mr-2 h-5 w-5" />
              Insights
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/settings"> {/* Assuming settings page doesn't strictly require auth for now */}
              {/* <Settings className="mr-2 h-5 w-5" /> Re-add if needed */}
              Settings
            </Link>
          </Button>

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
                  <Settings className="mr-2 h-4 w-4" />
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
