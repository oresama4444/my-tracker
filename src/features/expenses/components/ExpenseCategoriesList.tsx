import { useState } from "react";
import { calculatePercentage, calculateToGo } from "../../../lib/calculations";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import { useExpensesContext } from "../context/ExpensesContext";
import { ExpensesCategoryDetail } from "./ExpensesCategoryDetail";
import { ChevronDown, Dot } from "lucide-react";

export function ExpenseCategoriesList() {
  const { expensesByCategory } = useExpensesContext();
  const [activeDetail, setActiveDetail] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    if (activeDetail === id) return setActiveDetail(null);

    setActiveDetail(id);
  };

  return (
    <main>
      {expensesByCategory.map(({ id, category, transactions, meta }) => (
        <div key={id} className="border border-stone-200 rounded-lg m-2 py-2">
          <div className="flex justify-between py-2 px-4">
            <div className="flex">
              <Dot color={category.color} />
              <h2>{capitalizeWord(category.name)}</h2>
            </div>
            <div className="flex gap-2 text-sm">
              <p className="font-mono">{formatCurrency(meta.total)}</p>
              <p>/</p>
              <p className="font-mono">{formatCurrency(category.target)}</p>
              <ChevronDown
                size={18}
                onClick={() => handleEdit(id)}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="w-11/12 m-auto">
            <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${calculatePercentage(category?.target, meta.total)}%`,
                  backgroundColor: `${category?.color}`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs py-1">
              <span>{`${meta.count} gastos`}</span>
              <span className="flex gap-2">
                <p className="font-mono">
                  {calculateToGo(category.target, meta.total)}
                </p>
                <p>restante</p>
              </span>
            </div>
          </div>
          <div
            className={`${activeDetail === id ? "max-h-96 opacity-100 pointer-events-auto" : " max-h-0 opacity-0 pointer-events-none"} transition-all duration-200 bg-stone-50 rounded-xl`}
          >
            <ExpensesCategoryDetail
              name={category.name}
              budget={category.target}
              expenses={transactions}
              total={meta.total}
            />
          </div>
        </div>
      ))}
    </main>
  );
}
