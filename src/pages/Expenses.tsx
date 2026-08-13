import { Button } from "../components/Button";

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

export function Expenses() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200">
      <header className="flex items-center justify-center w-full bg-white p-4">
        <div className="flex items-center justify-between w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <div className="flex gap-2">
            <Button variant="secondary">Reset filters</Button>
            <Button>New expense</Button>
          </div>
        </div>
      </header>
      {/* <section>filters</section>
      <section>expenses</section>
      <section>pagination</section> */}
    </div>
  );
}
