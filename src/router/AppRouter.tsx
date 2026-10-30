import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../pages/Home";
import { Balance } from "../pages/Balance";
import { Expenses } from "../pages/Expenses";
import { Incomes } from "../pages/Incomes";
import { Header } from "../components/Header";
import { Savings } from "../pages/Savings";
import { ExpensesList } from "../features/expenses/components/ExpensesList";
import { ExpensesCategories } from "../features/expenses/components/ExpensesCategories";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/expenses" element={<Expenses />}>
          <Route path="" element={<ExpensesList />} />
          <Route path="date" element={<ExpensesList />} />
          <Route path="category" element={<ExpensesCategories />} />
        </Route>
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/savings" element={<Savings />} />
      </Routes>
    </BrowserRouter>
  );
}
