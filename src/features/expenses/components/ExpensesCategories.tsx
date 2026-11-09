import { ChevronDown, Dot, Plus, Tag } from "lucide-react";
import { useExpensesContext } from "../context/ExpensesContext";
import {
  capitalizeWord,
  cleanCurrency,
  formatCurrency,
} from "../../../lib/formatter";
import { calculatePercentage, calculateToGo } from "../../../lib/calculations";
import { ExpensesCategoryDetail } from "./ExpensesCategoryDetail";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { useCategories } from "../../categories/useCategories";
import type { NewCategoryFormData } from "../../categories/types";
import { NewCategoryForm } from "../../categories/components/NewCategoryFrom";

export function ExpensesCategories() {
  const { addCategory } = useCategories();
  const { expensesByCategory } = useExpensesContext();
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  const [activeCategoryForm, setActiveCategoryForm] = useState<boolean | null>(
    null,
  );
  const [categoryFormData, setCategoryFormData] = useState<NewCategoryFormData>(
    {
      transaction_type: "expense",
      name: "",
      description: "",
      color: "#F87171",
    },
  );

  const handleEdit = (id: string) => {
    if (activeDetail === id) return setActiveDetail(null);

    setActiveDetail(id);
  };

  const handleCategorySubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    // console.log(categoryFormData);
    const createdCategory = await addCategory(categoryFormData);
    console.log(createdCategory);
  };

  const handleCategoryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === "target")
      return setCategoryFormData((prev) => ({
        ...prev,
        [name]: cleanCurrency(value),
      }));

    setCategoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="mx-auto max-w-4xl border rounded-2xl border-stone-300">
      <div className="flex items-center justify-between py-2 px-4 border-b border-b-stone-300">
        <div className="flex items-center gap-2">
          <Tag size={18} />
          <h1 className="font-medium text-stone-700">Gastos por Categoría</h1>
        </div>
        <div>
          <button
            onClick={() => setActiveCategoryForm(!activeCategoryForm)}
            className="flex items-center gap-1 cursor-pointer rounded-lg py-1 px-2 transition-all duration-100 hover:bg-emerald-300 border border-stone-200 text-sm font-medium"
          >
            Agregar Categoría
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div
        className={`${activeCategoryForm ? "max-h-96 opacity-100 pointer-events-auto px-4 py-2" : " max-h-0 opacity-0 pointer-events-none p-0"} transition-all duration-300`}
      >
        <NewCategoryForm
          formData={categoryFormData}
          handleChange={handleCategoryChange}
          handleSubmit={handleCategorySubmit}
        />
        <div>
          <button form="new-category">Guardar</button>
        </div>
      </div>
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
    </section>
  );
}
