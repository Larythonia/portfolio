const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-night";

const variants = {
  primary: "bg-caramel text-night hover:bg-cream",
  outline: "border border-caramel text-caramel hover:bg-caramel/10",
  ghost: "text-caramel hover:bg-caramel/10",
};

export default function Button({
  as,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const Tag = as || (props.href ? "a" : "button");
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}