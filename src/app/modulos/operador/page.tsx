"use client";

import { FirtsStep } from "@/components/forms/register-operator/FirtsStep";
import { SecondStep } from "@/components/forms/register-operator/SecondStep";
import { Steps } from "@/components/common/Steps";
import { StepValidationProvider } from "@/context/steps/steps";
import { ThirdStep } from "@/components/forms/register-operator/third-step/View";

export default function Page() {
  const steps = [
    {
      title: "Registrar operador",
      content: <FirtsStep />,
    },
    {
      title: "Estratificación",
      content: <SecondStep />,
    },
    {
      title: "Parametrización",
      content: <ThirdStep />,
    },
  ];

  return (
    <StepValidationProvider>
      <main className="p-6">
        <Steps steps={steps} />
      </main>
    </StepValidationProvider>
  );
}