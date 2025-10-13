
"use client";

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionUploadDialog } from "@/components/admin/question-upload-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3, Eye, Clock, Activity, UploadCloud, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { adminService } from '@/lib/firestore-service';
import { AdminStats, RecentUserActivity, RevenueStats } from '@/types';
import { RevenueCard } from '@/components/admin/revenue-card';



export default function AdminDashboardPage() {
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUserActivity[]>([]);
  const [revenueStats, setRevenueStats] = useState<RevenueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await adminService.getAdminStats();
        setAdminStats(stats);

        const users = await adminService.getRecentUserActivity();
        setRecentUsers(users);

        const revenue = await adminService.getRevenueStats();
        setRevenueStats(revenue);
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-3 text-lg">Loading Admin Dashboard...</span>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-lg text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen shadow-lg rounded-lg">
      <div className="space-y-8 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl flex items-center dark:text-gray-50">
            <BarChart3 className="mr-3 h-8 w-8 text-primary" />
            Admin Dashboard
          </h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            Overview of application usage, user activity, and content management.
          </p>
        </div>
        <QuestionUploadDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <RevenueCard totalRevenue={revenueStats?.totalRevenue || 0} period="All Time" />
        <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Active Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{adminStats?.todaysUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">+5 since yesterday</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Active Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{adminStats?.monthlyUsers}</div>
             <p className="text-xs text-muted-foreground mt-1">+10% this month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Registered Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{adminStats?.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Growing steadily</p>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Most Viewed Exam</CardTitle>
            <Eye className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{adminStats?.mostViewedExam}</div>
            <p className="text-xs text-muted-foreground mt-1">Based on recent activity</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Most Viewed Subject</CardTitle>
            <Activity className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{adminStats?.mostViewedSubject}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all exams</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Management */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Content Management</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upload New Questions</CardTitle>
              <UploadCloud className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">Add new questions to the database for various exams and subjects.</p>
              <QuestionUploadDialog />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Users Table */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">Recent User Activity</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">A snapshot of user details and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
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
              {recentUsers.map((user) => (
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
          </div>
        </CardContent>
      </Card>

      {/* Question Upload Form */}


    </div>
    </div>
  );
}
