"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, GraduationCap, Calendar, Clock, Save, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ScholarshipData {
  isActive: boolean;
  startDate: string;
  endDate: string;
  duration: number;
  description: string;
  lastUpdated: string;
}

export function ScholarshipManagement() {
  const [scholarship, setScholarship] = useState<ScholarshipData | null>(null);
  const [newDuration, setNewDuration] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);
  const { toast } = useToast();

  const fetchScholarship = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/scholarship");
      if (!response.ok) {
        throw new Error("Failed to fetch scholarship data");
      }
      const data = await response.json();
      setScholarship(data);
      setNewDuration(data.duration ? data.duration.toString() : "0");
      setNewDescription(data.description || "");
    } catch (error) {
      console.error("Error fetching scholarship:", error);
      toast({
        title: "Error",
        description: "Failed to load scholarship data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateScholarship = async () => {
    if (!newDuration || isNaN(Number(newDuration)) || Number(newDuration) <= 0) {
      toast({
        title: "Invalid Duration",
        description: "Please enter a valid duration greater than 0 days",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const response = await fetch("/api/admin/scholarship", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: scholarship?.isActive || false,
          duration: Number(newDuration),
          description: newDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update scholarship");
      }

      const updatedData = await response.json();
      setScholarship(updatedData);
      
      toast({
        title: "Success",
        description: "Scholarship settings updated successfully",
      });
    } catch (error) {
      console.error("Error updating scholarship:", error);
      toast({
        title: "Error",
        description: "Failed to update scholarship settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleScholarship = async () => {
    try {
      setToggling(true);
      const response = await fetch("/api/admin/scholarship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "toggle",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to toggle scholarship");
      }

      setScholarship(result);
      
      toast({
        title: "Success",
        description: `Scholarship ${result.isActive ? "activated" : "deactivated"} successfully`,
      });
    } catch (error) {
      console.error("Error toggling scholarship:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to toggle scholarship",
        variant: "destructive",
      });
    } finally {
      setToggling(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRemainingTime = () => {
    if (!scholarship?.isActive || !scholarship?.endDate) return null;
    
    const now = new Date();
    const endDate = new Date(scholarship.endDate);
    const diffTime = endDate.getTime() - now.getTime();
    
    if (diffTime <= 0) return "Expired";
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffDays > 1) {
      return `${diffDays} days remaining`;
    } else {
      return `${diffHours} hours remaining`;
    }
  };

  useEffect(() => {
    fetchScholarship();
  }, []);

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Scholarship Management
          </CardTitle>
          <CardDescription>
            Manage scholarship program and payment gateway control
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading scholarship data...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Scholarship Management
        </CardTitle>
        <CardDescription>
          Manage scholarship program and payment gateway control
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Current Status</h3>
            <Badge variant={scholarship?.isActive ? "default" : "secondary"}>
              {scholarship?.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Start Date:</p>
              <p className="font-medium">{formatDate(scholarship?.startDate || "")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">End Date:</p>
              <p className="font-medium">{formatDate(scholarship?.endDate || "")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration:</p>
              <p className="font-medium">{scholarship?.duration} days</p>
            </div>
            <div>
              <p className="text-muted-foreground">Time Remaining:</p>
              <p className="font-medium">{getRemainingTime() || "Not active"}</p>
            </div>
          </div>
        </div>

        {/* Toggle Control */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <h4 className="font-medium">Scholarship Program</h4>
            <p className="text-sm text-muted-foreground">
              {scholarship?.isActive 
                ? "Payment gateway is currently disabled for all users" 
                : "Payment gateway is active - users need to pay to access content"
              }
            </p>
          </div>
          <Button
            onClick={toggleScholarship}
            disabled={toggling}
            variant={scholarship?.isActive ? "destructive" : "default"}
            size="sm"
          >
            {toggling ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {scholarship?.isActive ? "Deactivate" : "Activate"}
          </Button>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h4 className="font-medium">Scholarship Settings</h4>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (days)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="Enter duration in days"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              min="1"
              step="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter scholarship description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={updateScholarship} 
              disabled={saving || !newDuration}
              className="flex-1"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Settings
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={fetchScholarship}
              disabled={loading}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Information */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• When scholarship is active, all payment gateways are disabled</p>
          <p>• Users get free access to all content during the scholarship period</p>
          <p>• Scholarship automatically expires after the set duration</p>
          <p>• You can manually deactivate the scholarship at any time</p>
        </div>
      </CardContent>
    </Card>
  );
}