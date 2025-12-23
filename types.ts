
export type ExpenseCategory = 'Transport' | 'Accommodation' | 'Food' | 'Entertainment' | 'Shopping' | 'Miscellaneous';

export interface Activity {
  id: string;
  time: string;
  description: string;
  location: string;
  estimatedCost: number;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

export interface TravelPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  currency: string; // e.g., 'USD', 'EUR', 'JPY'
  itinerary: ItineraryDay[];
  expenses: Expense[];
  status: 'planning' | 'ongoing' | 'completed';
  imageUrl?: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
  currency: string;
}

export interface SpendAnalysis {
  summary: string;
  tips: string[];
  categoryBreakdown: { category: string; amount: number }[];
  overBudgetRisk: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
