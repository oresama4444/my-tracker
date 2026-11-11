import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import type { NewCategoryFormData } from "../../categories/types";
import { cleanCurrency } from "../../../lib/formatter";
import { useExpensesContext } from "../context/ExpensesContext";
import { NewCategoryForm } from "../../categories/components/NewCategoryFrom";
import { ExpenseCategoriesList } from "./ExpenseCategoriesList";
import { Plus, Tag } from "lucide-react";
import toast from "react-hot-toast";

export function ExpensesCategories() {
  const { addExpensesCategory } = useExpensesContext();

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

  const handleCategorySubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    const created = await addExpensesCategory(categoryFormData);

    if (!created) return toast.error("Error al crear categoría");

    toast.success("Categoría creada correctamente");
    setCategoryFormData({
      transaction_type: "expense",
      name: "",
      description: "",
      color: "#F87171",
    });
    setActiveCategoryForm(false);
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
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setActiveCategoryForm(false)}
            className="hover:bg-red-200 flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100"
          >
            Cancelar
          </button>
          <button
            form="new-category"
            className="bg-emerald-500 hover:bg-emerald-400 flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100"
          >
            Guardar
          </button>
        </div>
      </div>
      <ExpenseCategoriesList />
    </section>
  );
}
