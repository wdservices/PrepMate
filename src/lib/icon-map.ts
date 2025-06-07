
import type { LucideIcon } from 'lucide-react';
import {
  BookText, Atom, Languages, Calculator, Leaf, FlaskConical, Users, GraduationCap,
  BookOpenText, ClipboardCheck, Landmark, Scale, TrendingUp, DollarSign, Tractor, Sprout,
  Store, ShoppingBag, Globe2, Map as MapIcon, NotebookText, BookHeart, Feather, Cross,
  FunctionSquare, InfinityIcon, MessagesSquare, Palette, Brush, Laptop, Code, CookingPot,
  Apple, ScrollText, MoonStar, BookOpen, Milestone, HelpCircle // Added HelpCircle as a default
} from 'lucide-react';

export const ICON_MAP: { [key: string]: LucideIcon } = {
  BookText,
  Atom,
  Languages,
  Calculator,
  Leaf,
  FlaskConical,
  Users,
  GraduationCap,
  BookOpenText,
  ClipboardCheck,
  Landmark,
  Scale,
  TrendingUp,
  DollarSign,
  Tractor,
  Sprout,
  Store,
  ShoppingBag,
  Globe2,
  MapIcon, // Ensure this doesn't clash with Map data type if used elsewhere
  NotebookText,
  BookHeart,
  Feather,
  Cross,
  FunctionSquare,
  InfinityIcon,
  MessagesSquare,
  Palette,
  Brush,
  Laptop,
  Code,
  CookingPot,
  Apple,
  ScrollText,
  MoonStar,
  BookOpen,
  Milestone,
  Default: HelpCircle, // A default icon
};

export const getIconByName = (iconName?: string): LucideIcon => {
  if (iconName && ICON_MAP[iconName]) {
    return ICON_MAP[iconName];
  }
  return ICON_MAP.Default; // Return a default icon if no name or no match
};
