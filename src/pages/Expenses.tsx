import { ExpensesHeader } from "../features/expenses/components/ExpensesHeader";
import { ExpensesList } from "../features/expenses/components/ExpensesList";
import { ExpensesProvider } from "../features/expenses/context/ExpensesContext";

export function Expenses() {
  return (
    <div className="min-h-screen mt-2 bg-stone-50">
      <ExpensesProvider>
        <ExpensesHeader />
        <section className="mx-auto p-2 flex items-center justify-between max-w-4xl">
          <nav className="flex items-center gap-4 bg-stone-200 rounded-lg px-4 py-1 relative text-sm font-medium">
            <div>Por Fecha</div>
            <div>Por Categoría</div>
          </nav>
          <div>controls</div>
        </section>
        <ExpensesList />
      </ExpensesProvider>
    </div>
  );
}
