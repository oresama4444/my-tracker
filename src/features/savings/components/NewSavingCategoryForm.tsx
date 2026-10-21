import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import type { NewCategoryFormData } from "../../categories/types";
import type { NewSavingCategoryFormProps, NewSavingFormData } from "../types";
import { cleanDatetimeInput } from "../../../lib/dates";
import { cleanCurrency } from "../../../lib/formatter";
import { useCategories } from "../../categories/useCategories";
import { CategoryForm } from "./CategoryForm";
import { NewSavingForm } from "./NewSavingForm";
import toast from "react-hot-toast";

export function NewSavingCategoryForm({
  cancelForm,
  add,
}: NewSavingCategoryFormProps) {
  const { addCategory } = useCategories();
  const [categoryFormData, setCategoryFormData] = useState<NewCategoryFormData>(
    {
      transaction_type: "saving",
      name: "",
      description: "",
      color: "",
      target: 0,
    },
  );
  const [savingFormData, setSavingFormData] = useState<NewSavingFormData>({
    date: Date.now(),
    amount: 0,
    description: "",
    activity: "deposit",
  });

  const handleCategoryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === "target")
      return setCategoryFormData((prev) => ({
        ...prev,
        [name]: cleanCurrency(value),
      }));

    setCategoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name.includes("date"))
      return setSavingFormData((prev) => ({
        ...prev,
        date: cleanDatetimeInput(value),
      }));
    if (name.includes("amount"))
      return setSavingFormData((prev) => ({
        ...prev,
        amount: cleanCurrency(value),
      }));
    if (name.includes("activity"))
      return setSavingFormData((prev) => ({ ...prev, activity: value }));
    if (name.includes("description"))
      return setSavingFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const createdCategory = await addCategory(categoryFormData);
    if (typeof createdCategory === "boolean")
      return !createdCategory ? toast.error("Error al crear categoría") : "";

    const newSaving: NewSavingFormData = {
      category_id: createdCategory.categoryId,
      ...savingFormData,
    };
    const createdSaving = await add(newSaving);

    if (!createdSaving) return toast.error("Error al crear ahorro");

    toast.success("Registro creado correctamente");
    setCategoryFormData({
      transaction_type: "saving",
      name: "",
      description: "",
      color: "",
      target: 0,
    });
    setSavingFormData({
      date: Date.now(),
      amount: 0,
      description: "",
      activity: "deposit",
    });
    cancelForm();
  };

  const styles = {
    container: "grid grid-cols-1 items-center gap-1",
    label: "text-xs text-stone-500",
    input:
      "text-sm text-stone-600 border border-stone-300 bg-stone-100 rounded-md p-1.5",
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
    radio: "hidden",
    labelColorPick: "block w-10 h-10 rounded-xl cursor-pointer",
    pickedColor: "border-4 border-gray-700",
  };

  const savingFormStyles = {
    form: "my-2 grid grid-cols-2 gap-2",
    field: "grid grid-cols-1 items-center",
    label: "text-xs text-stone-500",
    input:
      "text-sm text-stone-600 border border-stone-300 bg-stone-100 rounded-md p-1.5",
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

  return (
    <>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>
      <div className="z-10 w-full max-w-md rounded-2xl bg-stone-50 p-6 shadow-xl">
        <div>
          <h1>Nueva Meta</h1>
        </div>
        <CategoryForm
          formData={categoryFormData}
          handleChange={handleCategoryChange}
          handleSubmit={handleSubmit}
        />
        <div className="pt-2 mt-4 border-t border-t-stone-300">
          <h2>Agregar Ahorro</h2>
        </div>
        <NewSavingForm
          formData={savingFormData}
          handleChange={handleSavingChange}
          handleSubmit={() => {}}
          styles={savingFormStyles}
          formId=""
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={cancelForm}
            className={`${styles.button} hover:bg-red-200`}
          >
            Cancelar
          </button>
          <button
            className={`${styles.button} bg-emerald-500 hover:bg-emerald-400`}
            form="new-saving-category"
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}
