interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 border border-line bg-offwhite px-4 py-3 text-sm text-navy transition-colors hover:border-camel/60 has-[:checked]:border-camel has-[:checked]:bg-camel/5">
      <input
        type="checkbox"
        className="h-4 w-4 accent-camel"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}
