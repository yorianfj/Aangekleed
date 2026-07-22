import type { ReactNode } from "react";

interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description?: string;
  price?: string;
  children?: ReactNode;
}

export function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  price,
  children,
}: RadioCardProps) {
  return (
    <label
      className={`block cursor-pointer border p-5 transition-colors ${
        checked ? "border-camel bg-camel/5" : "border-line bg-offwhite hover:border-camel/50"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-serif text-xl font-semibold text-navy">{title}</p>
          {description && <p className="mt-1 text-sm text-soft-navy">{description}</p>}
        </div>
        {price && <p className="whitespace-nowrap font-serif text-xl text-navy">{price}</p>}
      </div>
      {children}
    </label>
  );
}
