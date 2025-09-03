import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface ExamCardProps {
  id: string;
  title: string;
  description?: string;
  iconName?: string;
  className?: string;
  onClick?: () => void;
}

export function ExamCard({
  id,
  title,
  description,
  iconName,
  className,
  onClick,
}: ExamCardProps) {
  // Default to BookOpen icon if none provided
  const Icon = getIconComponent(iconName) || BookOpen;

  return (
    <Card 
      className={cn(
        'flex flex-col h-full transition-all duration-200 hover:shadow-md hover:border-primary/20',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3">
          {description || 'No description available'}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          View Subjects
        </Button>
      </CardFooter>
    </Card>
  );
}

// Helper function to dynamically import icons
function getIconComponent(iconName?: string): LucideIcon | null {
  if (!iconName) return null;
  
  try {
    // Dynamically import the icon from lucide-react
    const icons = require('lucide-react');
    return icons[iconName] || null;
  } catch (error) {
    console.warn(`Icon '${iconName}' not found in lucide-react`);
    return null;
  }
}
