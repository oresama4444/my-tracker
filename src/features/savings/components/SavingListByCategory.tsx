import { Fragment } from "react/jsx-runtime";
import type { SavingListByCategoryProps } from "../types";
import { SavingsListItem } from "./SavingsListItem";

export function SavingListByCategory({
  savings,
  handleDelete,
}: SavingListByCategoryProps) {
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
