import { useState } from "react";
import { Button } from "../components/Button";
import { Dot, SquarePen, Trash } from "lucide-react";

type Expense = {
  id: string;
  date: number;
  amount: number;
  description: string;
  location?: string;
  category?: string;
  subcategory?: string;
  account?: string;
};

const sampleData: Expense[] = [
  {
    id: "1",
    date: 1785542400000,
    amount: 3.5,
    description: "coffee",
    location: "Starbucks",
    category: "Food",
    subcategory: "Beverages",
    account: "Credit Card",
  },
  {
    id: "2",
    date: 1785542400000,
    amount: 12,
    description: "lunch",
    location: "Deli",
    category: "Food",
    subcategory: "Meals",
    account: "Cash",
  },
  {
    id: "3",
    date: 1785628800000,
    amount: 45,
    description: "groceries",
    location: "Market",
    category: "Household",
    subcategory: "Groceries",
    account: "Debit Card",
  },
];

function loadExpenses(): Expense[] {
  return sampleData;
}

export function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen bg-gray-200">
      <header className="flex items-center justify-center w-full bg-white p-4">
        <div className="flex items-center justify-between w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <div className="flex gap-2">
            <Button variant="secondary">Reset filters</Button>
            <Button>New expense</Button>
          </div>
        </div>
      </header>
      {/* <section>filters</section> */}
      <section className="flex flex-col gap-2 p-4 bg-white w-full max-w-4xl rounded-xl">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="sm:grid sm:grid-cols-[100px_1fr_120px] items-center rounded-lg border border-gray-100 p-2"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              ${expense.amount.toFixed(2)}
            </h2>
            <div className="flex-1 flex items-center justify-between text-gray-600">
              <div>
                <p className="">{expense.description}</p>
                <div className="flex items-center text-xs">
                  <p className="">{expense.category}</p>
                  <Dot />
                  <p className="">{expense.subcategory}</p>
                </div>
              </div>
              <p className="text-sm">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary">
                <SquarePen size={14} className="m-1" />
              </Button>
              <Button variant="danger">
                <Trash size={14} className="m-1" />
              </Button>
            </div>
          </div>
        ))}
      </section>
      {/* <section>pagination</section> */}
    </div>
  );
}
