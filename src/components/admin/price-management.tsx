"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, DollarSign, Save, RefreshCw } from "lucide-react";

interface PricingData {
  monthlyPrice: number;
  currency: string;
  lastUpdated: string;
}

export function PriceManagement() {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [newPrice, setNewPrice] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchPricing = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/pricing");
      if (!response.ok) {
        throw new Error("Failed to fetch pricing");
      }
      const data = await response.json();
      setPricing(data);
      setNewPrice(data.monthlyPrice && typeof data.monthlyPrice === 'number' ? (data.monthlyPrice / 100).toString() : "50"); // Convert from kobo to naira for display
    } catch (error) {
      console.error("Error fetching pricing:", error);
      toast({
        title: "Error",
        description: "Failed to load current pricing",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePricing = async () => {
    if (!newPrice || isNaN(Number(newPrice)) || Number(newPrice) <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price greater than 0",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const response = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthlyPrice: Number(newPrice) * 100, // Convert to kobo
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update pricing");
      }

      const updatedData = await response.json();
      setPricing(updatedData);
      
      toast({
        title: "Success",
        description: "Pricing updated successfully",
      });
    } catch (error) {
      console.error("Error updating pricing:", error);
      toast({
        title: "Error",
        description: "Failed to update pricing",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Price Management
          </CardTitle>
          <CardDescription>
            Manage subscription pricing for the application
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading pricing...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Price Management
        </CardTitle>
        <CardDescription>
          Manage subscription pricing for the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Pricing Display */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Current Pricing</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              ₦{pricing?.monthlyPrice ? (pricing.monthlyPrice / 100).toLocaleString() : "0"}
            </span>
            <span className="text-muted-foreground">/ month</span>
          </div>
          {pricing?.lastUpdated && (
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {new Date(pricing.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Price Update Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPrice">New Monthly Price (₦)</Label>
            <Input
              id="newPrice"
              type="number"
              placeholder="Enter new price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              min="1"
              step="1"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={updatePricing} 
              disabled={saving || !newPrice}
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
                  Update Price
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={fetchPricing}
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Pricing Information */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Price changes will apply to new subscriptions immediately</p>
          <p>• Existing subscriptions will continue at their current rate</p>
          <p>• All prices are in Nigerian Naira (₦)</p>
        </div>
      </CardContent>
    </Card>
  );
}