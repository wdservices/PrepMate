
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3, Eye, Clock, Activity, UploadCloud, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

// Mock data - in a real app, this would come from your database/analytics
const mockStats = {
  todaysUsers: 125,
  monthlyUsers: 1850,
  totalUsers: 5400,
  mostViewedExam: "JAMB",
  mostViewedSubject: "Chemistry",
};

const mockRecentUsers = [
  { id: "user1", name: "Aisha Bello", email: "aisha.b@example.com", lastSeen: "Online", examsTaken: 3, role: "Student" },
  { id: "user2", name: "Chinedu Okoro", email: "chinedu.o@example.com", lastSeen: "2 hours ago", examsTaken: 1, role: "Student" },
  { id: "user3", name: "Funke Adebayo", email: "funke.a@example.com", lastSeen: "1 day ago", examsTaken: 5, role: "Student" },
  { id: "user4", name: "Musa Ibrahim", email: "musa.i@example.com", lastSeen: "Online", examsTaken: 0, role: "New User" },
  { id: "user5", name: "Admin User", email: "admin@prepmate.com", lastSeen: "5 minutes ago", examsTaken: 0, role: "Admin" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl flex items-center">
            <BarChart3 className="mr-3 h-8 w-8 text-primary" />
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Overview of application usage, user activity, and content management.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Active Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{mockStats.todaysUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">+5 since yesterday (mock data)</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Active Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{mockStats.monthlyUsers}</div>
             <p className="text-xs text-muted-foreground mt-1">+10% this month (mock data)</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Registered Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{mockStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Growing steadily (mock data)</p>
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Most Viewed Exam</CardTitle>
            <Eye className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.mostViewedExam}</div>
            <p className="text-xs text-muted-foreground mt-1">Based on recent activity (mock data)</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Most Viewed Subject</CardTitle>
            <Activity className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.mostViewedSubject}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all exams (mock data)</p>
          </CardContent>
        </Card>
      </div>

       {/* Content Management Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Content Management</CardTitle>
          <CardDescription>Add new questions to the Firestore database.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Use the question upload page to add new content to your exams.</p>
        </CardContent>
        <CardFooter>
            <Button asChild>
                <Link href="/admin/upload-question">
                    <UploadCloud className="mr-2 h-5 w-5" />
                    Go to Question Upload Page
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
      </Card>


      {/* Recent Users Table */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Recent User Activity</CardTitle>
          <CardDescription>A snapshot of user details and their status. (Mock Data)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden sm:table-cell">Exams Taken</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead className="text-right">Last Seen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRecentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden sm:table-cell">{user.examsTaken}</TableCell>
                  <TableCell className="hidden md:table-cell">
                     <Badge variant={user.role === "Admin" ? "destructive" : "secondary"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={user.lastSeen === "Online" ? "default" : "outline"} className="flex items-center gap-1 w-fit ml-auto">
                       {user.lastSeen === "Online" && <span className="h-2 w-2 rounded-full bg-green-500 inline-block animate-pulse"></span>}
                      {user.lastSeen}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
