import { STEP_LABELS } from "./types";

export function ProgressBar({ step }: { step: number }) {
  const total = STEP_LABELS.length;
  const percent = ((step + 1) / total) * 100;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-soft-navy">
        <span>
          Stap {step + 1} van {total}
        </span>
        <span>{STEP_LABELS[step]}</span>
      </div>
      <div className="mt-3 h-px w-full bg-line">
        <div
          className="h-px bg-camel transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
