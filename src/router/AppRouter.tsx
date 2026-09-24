import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../pages/Home";
import { Balance } from "../pages/Balance";
import { Expenses } from "../pages/Expenses";
import { Incomes } from "../pages/Incomes";
import { Header } from "../components/Header";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/incomes" element={<Incomes />} />
      </Routes>
    </BrowserRouter>
  );
}
