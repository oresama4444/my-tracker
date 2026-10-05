import type { Category } from "../../types/common";

export interface Saving {
  id: string;
  date: number;
  amount: number;
  description: string;
  activity: string;
  category_id?: string;
}

export interface SavingCategory {
  id: string;
  category: Category | null;
  transactions: Saving[];
  meta: {
    count: number;
    total: number;
  };
}

export interface GetSavingsResponse {
  savings: {
    raw: Saving[];
    groupedByCategory: SavingCategory[];
  };
}
