import { Outlet } from "react-router";
import { ExpensesHeader } from "../features/expenses/components/ExpensesHeader";
import { ExpensesProvider } from "../features/expenses/context/ExpensesContext";
import { ExpensesToolbar } from "./ExpensesToolbar";

export function Expenses() {
  return (
    <div className="min-h-screen mt-2 bg-stone-50">
      <ExpensesProvider>
        <ExpensesHeader />
        <ExpensesToolbar />
        <Outlet />
      </ExpensesProvider>
    </div>
  );
}
