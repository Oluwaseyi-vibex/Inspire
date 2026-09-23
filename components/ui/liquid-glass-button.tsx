export function LiquidButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button"> & { children: React.ReactNode }) {
  return (
    <button
      className={`relative overflow-hidden rounded-lg px-8 py-3.5 font-semibold text-sm border border-white/20 backdrop-blur-md transition-all duration-300 active:scale-95 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/60 via-red-900/30 to-red-900/60 bg-[length:200%_200%] animate-[liquid_3s_ease-in-out_infinite]" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
