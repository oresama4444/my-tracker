import { useState } from "react";
import type { CategoriesSelectorProps } from "../types";
import { capitalizeWord } from "../../../lib/formatter";
import { ChevronDown } from "lucide-react";

export function CategoriesSelector({
  categories,
  categoryId,
  getCategoryName,
  handleChange,
  inputId,
}: CategoriesSelectorProps) {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setActiveMenu((prev) => !prev)}
        className="text-sm text-stone-600 border border-stone-300 bg-stone-100 rounded-md p-1.5 flex justify-end items-center gap-1 cursor-pointer relative"
      >
        <p>
          {categoryId ? capitalizeWord(getCategoryName(categoryId)) : "General"}
        </p>
        <ChevronDown />
        <div
          className={`${activeMenu ? "max-h-96 opacity-100 pointer-events-auto" : " max-h-0 opacity-0 pointer-events-none"} absolute min-w-60 top-full mt-1 p-2 rounded-lg bg-stone-400/80 text-stone-100 flex flex-col gap-1 items-end z-20 cursor-auto transition-all duration-300`}
        >
          <div className="w-full">
            <label
              onClick={() => setActiveMenu(false)}
              htmlFor={`general${inputId ? `-${inputId}` : ""}`}
              className="hover:bg-stone-500/80 cursor-pointer flex gap-1 items-center justify-end rounded p-1 transition-all duration-200"
            >
              General
            </label>
            <input
              type="radio"
              name="category_id"
              id={`general${inputId ? `-${inputId}` : ""}`}
              value=""
              onChange={handleChange}
              defaultChecked
              className="hidden"
            />
          </div>
          {categories?.map((category) => (
            <div key={category.id} className="w-full">
              <label
                onClick={() => setActiveMenu(false)}
                htmlFor={inputId ? `${category.id}-${inputId}` : category.id}
                className="hover:bg-stone-500/80 cursor-pointer flex gap-1 items-center justify-end rounded p-1 transition-all duration-200"
              >
                {capitalizeWord(category.name)}
              </label>
              <input
                type="radio"
                name="category_id"
                id={inputId ? `${category.id}-${inputId}` : category.id}
                value={category.id}
                onChange={handleChange}
                className="hidden"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
