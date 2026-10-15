import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import type { NewCategoryFormData } from "../../categories/types";
import { cleanCurrency, formatCurrency } from "../../../lib/formatter";
import { useCategories } from "../../categories/useCategories";
import toast from "react-hot-toast";

export function NewSavingCategoryForm({
  cancelForm,
}: {
  cancelForm: () => void;
}) {
  const { add } = useCategories();
  const [formData, setFormData] = useState<NewCategoryFormData>({
    transaction_type: "saving",
    name: "",
    description: "",
    color: "",
    target: 0,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    if (name === "color") console.log(name, value);
    if (name === "target")
      return setFormData((prev) => ({ ...prev, [name]: cleanCurrency(value) }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(formData);
    const created = await add(formData);
    if (!created) return toast.error("Error al agregar ingreso");

    toast.success("Registro creado correctamente");
    setFormData({
      transaction_type: "saving",
      name: "",
      description: "",
      color: "",
      target: 0,
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

  return (
    <>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>
      <div className="z-10 w-full max-w-md rounded-2xl bg-stone-50 p-6 shadow-xl">
        <div>
          <h1>Nueva Meta</h1>
        </div>
        <form
          id="new-saving-category"
          onSubmit={handleSubmit}
          className="my-2 grid grid-cols-2 gap-2"
        >
          <div className={styles.container}>
            <label htmlFor="name" className={styles.label}>
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              className={styles.input}
              onChange={handleChange}
            />
          </div>
          <div className={styles.container}>
            <label htmlFor="target" className={styles.label}>
              Objetivo:
            </label>
            <input
              type="text"
              id="target"
              name="target"
              value={formatCurrency(formData.target)}
              className={styles.input}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.container} col-span-2`}>
            <label htmlFor="description" className={styles.label}>
              Descripción:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              className={styles.input}
              onChange={handleChange}
            />
          </div>
          <div className={styles.container}>
            <div className={styles.label}>Color:</div>
            <div className="flex gap-2">
              <div>
                <input
                  type="radio"
                  id="red"
                  name="color"
                  value="#F87171"
                  className={styles.radio}
                  onChange={handleChange}
                />
                <label
                  htmlFor="red"
                  className={`${styles.labelColorPick} ${formData.color === "#F87171" && styles.pickedColor}`}
                  style={{ backgroundColor: "#F87171" }}
                ></label>
              </div>
              <div>
                <input
                  type="radio"
                  id="orange"
                  name="color"
                  value="#FB923C"
                  className={styles.radio}
                  onChange={handleChange}
                />
                <label
                  htmlFor="orange"
                  className={`${styles.labelColorPick} ${formData.color === "#FB923C" && styles.pickedColor}`}
                  style={{ backgroundColor: "#FB923C" }}
                ></label>
              </div>
              <div>
                <input
                  type="radio"
                  id="green"
                  name="color"
                  value="#4ADE80"
                  className={styles.radio}
                  onChange={handleChange}
                />
                <label
                  htmlFor="green"
                  className={`${styles.labelColorPick} ${formData.color === "#4ADE80" && styles.pickedColor}`}
                  style={{ backgroundColor: "#4ADE80" }}
                ></label>
              </div>
              <div>
                <input
                  type="radio"
                  id="blue"
                  name="color"
                  value="#60A5FA"
                  className={styles.radio}
                  onChange={handleChange}
                />
                <label
                  htmlFor="blue"
                  className={`${styles.labelColorPick} ${formData.color === "#60A5FA" && styles.pickedColor}`}
                  style={{ backgroundColor: "#60A5FA" }}
                ></label>
              </div>
              <div>
                <input
                  type="radio"
                  id="purple"
                  name="color"
                  value="#A78BFA"
                  className={styles.radio}
                  onChange={handleChange}
                />
                <label
                  htmlFor="purple"
                  className={`${styles.labelColorPick} ${formData.color === "#A78BFA" && styles.pickedColor}`}
                  style={{ backgroundColor: "#A78BFA" }}
                ></label>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-end gap-2">
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
