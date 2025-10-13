
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Settings',
};

// This is a placeholder settings page. 
// In a real app, you would use useAuth() to get user info and allow updates.
// For now, it's a static UI.

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-left">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center">
          <UserCircle className="mr-3 h-10 w-10 text-primary" /> Account Settings
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Manage your account details and preferences.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Demo User" placeholder="Your full name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="demo@example.com" placeholder="your.email@example.com" disabled />
            <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
          </div>
           <div className="space-y-1">
            <Label htmlFor="photoUrl">Photo URL</Label>
            <Input id="photoUrl" defaultValue="https://placehold.co/100x100.png" placeholder="Link to your photo" />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled>Save Changes (Demo)</Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your account password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-1">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="Enter current password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="Enter new password" />
          </div>
           <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled variant="outline">Update Password (Demo)</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
