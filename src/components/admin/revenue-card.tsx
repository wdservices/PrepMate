import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface RevenueCardProps {
  totalRevenue: number;
  period: string;
}

export function RevenueCard({ totalRevenue, period }: RevenueCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue ({period})</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString("en-NG")}</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
}