import { IncomesHeader } from "../features/incomes/components/IncomesHeader";
import { IncomesList } from "../features/incomes/components/IncomesList";
import { useIncome } from "../features/incomes/hooks/useIncome";

export function Incomes() {
  const { addIncome, incomesByDay, removeIncome } = useIncome();

  return (
    <div className="min-h-screen bg-stone-50">
      <IncomesHeader addIncome={addIncome} />
      <IncomesList incomesByDay={incomesByDay} removeIncome={removeIncome} />
    </div>
  );
}
