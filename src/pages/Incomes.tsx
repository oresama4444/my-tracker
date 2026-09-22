import { IncomesHeader } from "../features/incomes/components/IncomesHeader";
import { useIncome } from "../features/incomes/hooks/useIncome";

export function Incomes() {
  const { addIncome } = useIncome();

  return (
    <div className="min-h-screen bg-stone-50">
      <IncomesHeader addIncome={addIncome} />
    </div>
  );
}
