import { useSaving } from "../features/savings/hooks/useSaving";
import { SavingCategoryCards } from "../features/savings/components/SavingCategoryCards";

export function Savings() {
  const { savingsByCategory, add, remove } = useSaving();

  return (
    <div className="min-h-screen mt-2 bg-stone-50">
      <SavingCategoryCards
        savingsByCategory={savingsByCategory}
        add={add}
        remove={remove}
      />
    </div>
  );
}
