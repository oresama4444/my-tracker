import { createContext, useContext, type ReactNode } from "react";
import { useExpenses } from "../hooks/useExpenses";

type ExpensesContextType = ReturnType<typeof useExpenses>;

const ExpensesContext = createContext<ExpensesContextType | null>(null);

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const expenses = useExpenses();

  return (
    <ExpensesContext.Provider value={expenses}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpensesContext() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error("Context not found");
  }

  return context;
}
