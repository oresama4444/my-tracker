import { Fragment } from "react/jsx-runtime";
import type { Saving } from "../types";
import { SavingsListItem } from "./SavingsListItem";

export function SavingListByCategory({
  savings,
  handleDelete,
}: {
  savings: Saving[];
  handleDelete: (id: string) => void;
}) {
  return (
    <div className="min-h-0 overflow-hidden">
      {savings.map((saving) => (
        <Fragment key={saving.id}>
          <SavingsListItem saving={saving} handleDelete={handleDelete} />
        </Fragment>
      ))}
    </div>
  );
}
