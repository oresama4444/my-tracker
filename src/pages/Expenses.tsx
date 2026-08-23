import { ExpensesHeader } from "../features/expenses/components/ExpensesHeader";
import { ExpensesList } from "../features/expenses/components/ExpensesList";

export function Expenses() {
  return (
    <div className="min-h-screen bg-stone-50">
      <ExpensesHeader />
      <ExpensesList />
    </div>
  );
}
