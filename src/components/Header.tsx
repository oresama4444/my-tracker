import { Crown, House } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";

export function Header() {
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

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

  const styles = {
    navLink: ({ isActive }: { isActive: boolean }) =>
      isActive ? "text-emerald-600 z-20" : "text-stone-600",
  };

  return (
    <header className="flex justify-between w-full py-4 px-5 lg:px-20 bg-white shadow-lg">
      <div>
        <div className="bg-amber-200 text-amber-600 rounded-4xl p-2">
          <Crown />
        </div>
      </div>
      <nav
        ref={navRef}
        className="flex items-center gap-4 bg-stone-200 rounded-xl px-4 relative"
      >
        <div
          className="pointer-events-none absolute top-1 bottom-1 rounded-lg bg-emerald-300/30 shadow-sm transition-all duration-300"
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />
        <NavLink to={"/"} end className={styles.navLink}>
          <div>
            <House />
          </div>
        </NavLink>
        <NavLink to={"/balance"} className={styles.navLink}>
          <div>Balance</div>
        </NavLink>
        <NavLink to={"/expenses"} className={styles.navLink}>
          <div>Gastos</div>
        </NavLink>
        <NavLink to={"/incomes"} className={styles.navLink}>
          <div>Ingresos</div>
        </NavLink>
        <NavLink to={"/savings"} className={styles.navLink}>
          <div>Ahorros</div>
        </NavLink>
      </nav>
    </header>
  );
}
