import { useSaving } from "../features/savings/hooks/useSaving";
import { SavingsList } from "../features/savings/components/SavingsList";

export function Savings() {
  const { savingsByCategory, add, remove } = useSaving();

  return (
    <div className="min-h-screen mt-2 bg-stone-50">
      <SavingsList
        savingsByCategory={savingsByCategory}
        add={add}
        remove={remove}
      />
    </div>
  );
}
