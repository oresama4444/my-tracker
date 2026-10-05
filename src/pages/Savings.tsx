import { SavingsList } from "../features/savings/components/SavingsList";
import { useSaving } from "../features/savings/hooks/useSaving";

export function Savings() {
  const { savingsByCategory } = useSaving();

  return (
    <div className="min-h-screen mt-2 bg-stone-50">
      <SavingsList savingsByCategory={savingsByCategory} />
    </div>
  );
}
