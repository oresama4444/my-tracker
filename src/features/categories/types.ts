import type { ChangeEventHandler, SubmitEventHandler } from "react";
import type { Category, TransactionType } from "../../types/common";

export interface NewCategoryFormData {
  transaction_type: TransactionType;
  name: string;
  description: string;
  color: string;
  target?: number;
}

export interface CreateCategoryResponse {
  created: boolean;
  categoryId: string;
}

export interface UpdateCategoryFormData {
  transaction_type?: string;
  name?: string;
  description?: string;
  color?: string;
  target?: number;
}

export interface DeleteCategoryResponse {
  deleted: boolean;
}

export interface UpdateCategoryResponse {
  updated: boolean;
}

export interface NewCategoryFormProps {
  formData: NewCategoryFormData;
  handleChange: ChangeEventHandler;
  handleSubmit: SubmitEventHandler;
}

export interface CategoriesSelectorProps {
  categories: Category[] | undefined;
  categoryId: string | undefined;
  getCategoryName: (categoryId: string) => string | undefined;
  handleChange: ChangeEventHandler;
}
