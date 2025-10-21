"use client";

import { PriceManagement } from "@/components/admin/price-management";

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Price Management
        </h1>
        <p className="text-muted-foreground">
          Manage subscription pricing for the application. Set monthly subscription rates and track pricing history.
        </p>
      </div>
      
      <PriceManagement />
    </div>
  );
}