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

export interface GetExpensesResponse {
  expenses: {
    groupedByDay: DailyExpense[];
    raw: Expense[];
  };
}

export interface FormData {
  amount?: number;
  description?: string;
  location?: string;
  category?: string;
  subcategory?: string;
  account?: string;
}

export interface ExpensesListProps {
  expensesByDay: DailyExpense[];
  update: (
    expenseId: string,
    data: FormData,
    expense: Expense,
  ) => Promise<boolean>;
  remove: (expenseId: string) => Promise<boolean>;
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
  handleUpdate: (expenseId: string, data: FormData, expense: Expense) => void;
}
