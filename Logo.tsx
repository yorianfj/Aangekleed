export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif text-xl font-semibold tracking-tight text-navy ${className}`}>
      AANGEKLEED<span className="text-camel">.</span>
    </span>
  );
}
