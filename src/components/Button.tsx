export function Button({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "secondary" | "danger";
}): React.JSX.Element {
  const variantStyles = {
    default: "bg-emerald-400 hover:bg-emerald-300 hover:shadow",
    secondary: "bg-gray-300 hover:bg-gray-200 hover:shadow",
    danger: "bg-red-300 hover:bg-red-400 hover:shadow",
  };

  const baseClasses =
    "rounded py-1 px-1.5 text-sm transition-all duration-150 cursor-pointer";
  const variantClasses =
    variant === "secondary"
      ? variantStyles.secondary
      : variant === "danger"
        ? variantStyles.danger
        : variantStyles.default;

  return (
    <button className={`${baseClasses} ${variantClasses}`}>{children}</button>
  );
}
