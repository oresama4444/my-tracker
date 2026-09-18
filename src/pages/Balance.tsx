import { BalanceHeader } from "../features/balance/components/BalanceHeader";
import { BalanceLog } from "../features/balance/components/BalanceLog";

export function Balance() {
  return (
    <div className="min-h-screen bg-stone-50">
      <BalanceHeader />
      <BalanceLog />
    </div>
  );
}
