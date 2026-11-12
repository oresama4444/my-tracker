import type { Category } from "../../types/common";

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
  transactions: Expense[];
}

export interface ExpenseCategory {
  id: string;
  category: Category;
  meta: ExpenseMeta;
  transactions: Expense[];
}

export interface GetExpensesResponse {
  expenses: {
    groupedByDay: DailyExpense[];
    groupedByCategory: ExpenseCategory[];
    raw: Expense[];
  };
}

export interface GetExpenseCategoriesResponse {
  expenseCategories: Category[];
}

export interface NewExpenseFormData {
  date: number;
  amount: number;
  description: string;
  location?: string;
  category?: string;
  subcategory?: string;
  account?: string;
}

export interface ExpenseUpdateFormData {
  amount?: number;
  description?: string;
  location?: string;
  category?: string;
  subcategory?: string;
  account?: string;
}

export interface ExpenseItemProps {
  expense: Expense;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export interface UpdateExpenseFormProps {
  expense: Expense;
  cancelEdit: () => void;
  isActive: boolean;
  handleUpdate: (
    expenseId: string,
    data: ExpenseUpdateFormData,
    expense: Expense,
  ) => void;
}
