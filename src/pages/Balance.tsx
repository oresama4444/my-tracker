import { BalanceHeader } from "../features/balance/components/BalanceHeader";
import { BalanceLog } from "../features/balance/components/BalanceLog";
import { useBalance } from "../features/balance/hooks/useBalance";

export function Balance() {
  const { logMoney, moneyLogs, removeLog } = useBalance();

  return (
    <div className="min-h-screen bg-stone-50">
      <BalanceHeader logMoney={logMoney} />
      <BalanceLog moneyLogs={moneyLogs} removeLog={removeLog} />
    </div>
  );
}
