import { useEffect, useState } from "react";
import {
  createSavingEntry,
  deleteSaving,
  getSavings,
  updateSaving,
} from "../savingService";
import type {
  NewSavingFormData,
  Saving,
  SavingCategory,
  UpdateSavingFormData,
} from "../types";
import { defaultSavingCategory } from "../../../lib/defaultCategories";

export function useSaving() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [savings, setSavings] = useState<Saving[]>([]);
  const [savingsByCategory, setSavingsByCategory] = useState<SavingCategory[]>(
    [],
  );

  async function loadSavings() {
    try {
      setLoading(true);

      const { savings } = await getSavings();
      const byCategory = Object.values(savings.groupedByCategory).map(
        (group): SavingCategory => ({
          ...group,
          category: group.category ?? defaultSavingCategory,
        }),
      );

      setSavings(savings.raw);
      setSavingsByCategory(byCategory);
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("Error al cargar los ingresos"),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSavings();
  }, []);

  async function add(data: NewSavingFormData): Promise<boolean> {
    try {
      setLoading(true);

      const created = await createSavingEntry(data);
      if (created) loadSavings();

      return created;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("No se pudo crear el gasto"),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function remove(savingId: string): Promise<boolean> {
    try {
      setLoading(true);

      const deleted = await deleteSaving(savingId);
      if (deleted) loadSavings();

      return deleted;
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("No se encontró el registro"),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function edit(
    data: UpdateSavingFormData,
    saving: Saving,
  ): Promise<boolean> {
    const newSaving: UpdateSavingFormData = {};

    if (Number(data.date) !== Number(saving.date))
      newSaving.date = Number(data.date);
    if (Number(data.amount) !== Number(saving.amount))
      newSaving.amount = Number(data.amount);
    if (data.description !== saving.description)
      newSaving.description = data.description;
    if (data.category_id !== saving.category_id)
      newSaving.category_id = data.category_id;
    if (data.activity !== saving.activity) newSaving.activity = data.activity;

    try {
      setLoading(true);

      const updated = await updateSaving(saving.id, newSaving);
      if (updated) loadSavings();

      return updated;
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("No se pudo actualizar el registro"),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    add,
    edit,
    remove,
    savings,
    savingsByCategory,
    loading,
    error,
  };
}
