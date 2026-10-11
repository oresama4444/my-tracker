import type { Category } from "../types/common";

export const defaultExpenseCategory = {};

export const defaultIncomeCategory = {};

export const defaultSavingCategory: Category = {
  id: "",
  transaction_type: "saving",
  name: "general",
  description: "sin categoría definida",
  // target: 10000,
  color: "#3CB52B",
};
