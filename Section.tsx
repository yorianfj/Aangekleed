import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="section">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-4">{children}</p>;
}

export function RomanIndex({ children }: { children: ReactNode }) {
  return (
    <span className="font-serif text-3xl italic text-camel">{children}</span>
  );
}
