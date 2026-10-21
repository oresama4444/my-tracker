import type { ChangeEventHandler, SubmitEventHandler } from "react";
import type { Category, FormStyles } from "../../types/common";
import type { NewCategoryFormData } from "../categories/types";

export interface Saving {
  id: string;
  date: number;
  amount: number;
  description: string;
  activity: string;
  category_id?: string;
}

export interface SavingCategory {
  id: string;
  category: Category | null;
  transactions: Saving[];
  meta: {
    count: number;
    total: number;
  };
}

export interface GetSavingsResponse {
  savings: {
    raw: Saving[];
    groupedByCategory: SavingCategory[];
  };
}

export interface CreateSavingEntryResponse {
  created: boolean;
}

export interface DeleteSavingResponse {
  deleted: boolean;
}

export interface UpdateSavingEntryResponse {
  updated: boolean;
}

export interface NewSavingFormData {
  date: number;
  amount: number;
  description: string;
  activity: string;
  category_id?: string;
}

export interface UpdateSavingFormData {
  date?: number;
  amount?: number;
  description?: string;
  activity?: string;
  category_id?: string;
}

export interface SavingsListProps {
  savingsByCategory: SavingCategory[];
  add: (data: NewSavingFormData) => Promise<boolean>;
  remove: (savingId: string) => Promise<boolean>;
}

export interface UpdateSavingFormProps {
  saving: Saving;
  cancelForm: () => void;
  edit: (data: UpdateSavingFormData, saving: Saving) => Promise<boolean>;
}

export interface SavingsHeaderProps {
  add: (data: NewSavingFormData) => Promise<boolean>;
}

export interface NewSavingCategoryFormProps {
  cancelForm: () => void;
  add: (data: NewSavingFormData) => Promise<boolean>;
}

export interface CategoryFormProps {
  formData: NewCategoryFormData;
  handleChange: ChangeEventHandler;
  handleSubmit: SubmitEventHandler;
}

export interface NewSavingFormProps {
  formData: NewSavingFormData;
  handleChange: ChangeEventHandler;
  handleSubmit: SubmitEventHandler;
  styles: FormStyles;
  formId: string;
}

export interface SavingListByCategoryProps {
  savings: Saving[];
  handleDelete: (id: string) => void;
}

export interface SavingsListItemProps {
  saving: Saving;
  handleDelete: (id: string) => void;
}
