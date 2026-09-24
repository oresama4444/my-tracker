import { ExpensesHeader } from "../features/expenses/components/ExpensesHeader";
import { ExpensesList } from "../features/expenses/components/ExpensesList";
import { useExpenses } from "../features/expenses/hooks/useExpenses";

export function Expenses() {
  const { expensesByDay, update, remove } = useExpenses();

  return (
    <div className="min-h-screen mt-2 bg-stone-50">
      <ExpensesHeader />
      <ExpensesList
        expensesByDay={expensesByDay}
        update={update}
        remove={remove}
      />
    </div>
  );
}
