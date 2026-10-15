import { api } from "../../lib/api";
import type {
  CreateCategoryResponse,
  DeleteCategoryResponse,
  NewCategoryFormData,
  UpdateCategoryFormData,
  UpdateCategoryResponse,
} from "./types";

export async function createCategory(
  data: NewCategoryFormData,
): Promise<CreateCategoryResponse> {
  const { created, categoryId } = await api<CreateCategoryResponse>(
    "/categories",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );

  return { created, categoryId };
}

export async function updateCategory(
  id: string,
  data: UpdateCategoryFormData,
): Promise<boolean> {
  const { updated } = await api<UpdateCategoryResponse>(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return updated;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const { deleted } = await api<DeleteCategoryResponse>(`/categories/${id}`, {
    method: "DELETE",
  });

  return deleted;
}
