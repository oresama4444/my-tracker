export interface Expense {
  id: string;
  date: number;
  amount: number;
  description: string;
  location?: string;
  category?: string;
  subcategory?: string;
  account?: string;
}

interface ExpenseMeta {
  count: number;
  total: number;
}

export interface DailyExpense {
  id: string;
  date: number;
  meta: ExpenseMeta;
  expenses: Expense[];
}

export interface GetExpensesResponse {
  expenses: {
    groupedByDay: DailyExpense[];
    raw: Expense[];
  };
}
