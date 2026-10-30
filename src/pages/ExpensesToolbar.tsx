import { CalendarDays, ChartColumn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";

export function ExpensesToolbar() {
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const defaultActive = nav.children[1];
    if (!defaultActive) return;

    const navRect = nav.getBoundingClientRect();
    const activeRect = defaultActive.getBoundingClientRect();

    setIndicator({
      left: activeRect.left - navRect.left - 10,
      width: activeRect.width + 20,
    });
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const active = nav.querySelector(
      '[aria-current="page"]',
    ) as HTMLElement | null;
    if (!active) return;

    const navRect = nav.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    setIndicator({
      left: activeRect.left - navRect.left - 10,
      width: activeRect.width + 20,
    });
  }, [location.pathname]);

  return (
    <section className="mx-auto p-2 flex items-center justify-between max-w-4xl">
      <nav
        ref={navRef}
        className="flex items-center gap-4 bg-stone-200 rounded-lg px-4 py-1.5 relative text-sm font-medium"
      >
        <div
          className="pointer-events-none absolute top-1 bottom-1 rounded-md bg-emerald-300/30 shadow-sm transition-all duration-300"
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />
        <NavLink to={"date"}>
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <p>Fecha</p>
          </div>
        </NavLink>
        <NavLink to={"category"}>
          <div className="flex items-center gap-1">
            <ChartColumn size={16} />
            <p>Categoría</p>
          </div>
        </NavLink>
      </nav>
      <div>{/* controls */}</div>
    </section>
  );
}
