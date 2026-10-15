import { useState } from "react";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "./categoryService";
import type {
  CreateCategoryResponse,
  NewCategoryFormData,
  UpdateCategoryFormData,
} from "./types";
import type { Category } from "../../types/common";

export function useCategories() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function addCategory(
    data: NewCategoryFormData,
  ): Promise<CreateCategoryResponse | boolean> {
    try {
      setLoading(true);

      const { created, categoryId } = await createCategory(data);
      if (!created) throw new Error("No se pudo crear");

      return { created, categoryId };
    } catch (error) {
      setError(error instanceof Error ? error : new Error("No se pudo crear"));
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function editCategory(
    data: UpdateCategoryFormData,
    category: Category,
  ): Promise<boolean> {
    const newCategory: UpdateCategoryFormData = {};

    if (data.transaction_type !== category.transaction_type)
      newCategory.transaction_type = data.transaction_type;
    if (data.name !== category.name) newCategory.name = data.name;
    if (data.description !== category.description)
      newCategory.description = data.description;
    if (data.color !== category.color) newCategory.color = data.color;
    if (Number(data.target) !== Number(category.target))
      newCategory.target = Number(data.target);

    try {
      setLoading(true);

      const updated = await updateCategory(category.id, newCategory);
      //   if (updated) load();

      return updated;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("No se pudo actualizar"),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function removeCategory(categoryId: string): Promise<boolean> {
    try {
      setLoading(true);

      const deleted = await deleteCategory(categoryId);
      // if (deleted) load();

      return deleted;
    } catch (error) {
      setError(error instanceof Error ? error : new Error("No se encontró"));
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    addCategory,
    editCategory,
    removeCategory,
    loading,
    error,
  };
}
