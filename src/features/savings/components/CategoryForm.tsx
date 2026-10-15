import type { ChangeEventHandler, SubmitEventHandler } from "react";
import type { NewCategoryFormData } from "../../categories/types";
import { formatCurrency } from "../../../lib/formatter";

export function CategoryForm({
  formData,
  handleChange,
  handleSubmit,
}: {
  formData: NewCategoryFormData;
  handleChange: ChangeEventHandler;
  handleSubmit: SubmitEventHandler;
}) {
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
  );
}
