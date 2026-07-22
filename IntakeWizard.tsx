"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/Button";
import { ProgressBar } from "./ProgressBar";
import { StepPackage } from "./StepPackage";
import { StepContact } from "./StepContact";
import { StepOccasion } from "./StepOccasion";
import { StepBody } from "./StepBody";
import { StepStyle } from "./StepStyle";
import { StepReview } from "./StepReview";
import { initialWizardState, type Errors, type WizardState } from "./types";
import { stap2Schema, stap3Schema, stap4Schema, stap5Schema } from "@/lib/validation";
import type { PlanId } from "@/lib/pricing";

const VALID_PLANS: PlanId[] = ["GELEGENHEID", "VINTED_JACHT", "CAPSULE"];

function zodErrorsToRecord(issues: { path: (string | number)[]; message: string }[]): Errors {
  const errors: Errors = {};
  for (const issue of issues) {
    const key = issue.path[0] as keyof WizardState;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function IntakeWizard() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const initialPlan = VALID_PLANS.includes(planParam as PlanId)
    ? (planParam as PlanId)
    : initialWizardState.plan;

  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardState>({ ...initialWizardState, plan: initialPlan });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update(patch: Partial<WizardState>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function validateStep(): boolean {
    let result;
    if (step === 1) result = stap2Schema.safeParse(data);
    else if (step === 2) result = stap3Schema.safeParse(data);
    else if (step === 3) result = stap4Schema.safeParse(data);
    else if (step === 4) result = stap5Schema.safeParse(data);
    else return true;

    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error.issues));
      return false;
    }
    setErrors({});
    return true;
  }

  function goNext() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Er ging iets mis. Probeer het opnieuw.");
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <ProgressBar step={step} />

      {step === 0 && <StepPackage data={data} update={update} />}
      {step === 1 && <StepContact data={data} update={update} errors={errors} />}
      {step === 2 && <StepOccasion data={data} update={update} errors={errors} />}
      {step === 3 && <StepBody data={data} update={update} errors={errors} />}
      {step === 4 && <StepStyle data={data} update={update} errors={errors} />}
      {step === 5 && <StepReview data={data} />}

      {submitError && (
        <p className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </p>
      )}

      <div className="mt-10 flex items-center justify-between border-t border-line pt-8">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="text-sm text-soft-navy hover:text-navy"
          >
            ← Vorige
          </button>
        ) : (
          <span />
        )}

        {step < 5 ? (
          <Button onClick={goNext}>Volgende</Button>
        ) : (
          <Button onClick={submit} disabled={submitting}>
            {submitting ? "Bezig..." : "Betaal & verstuur"}
          </Button>
        )}
      </div>
    </div>
  );
}
