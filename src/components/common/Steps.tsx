import Button from "./Button";
import { useStepValidation } from "@/context/steps/steps";

interface Step {
  title: string;
  content: JSX.Element;
}

interface StepperProps {
  steps: Step[];
}

export const Steps = ({ steps }: StepperProps) => {
  const { isValidStep, currentStep, setCurrentStep } = useStepValidation();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const isActive = (index: number) => index === currentStep;
  const goNext = () => !isLastStep && setCurrentStep(currentStep + 1);
  const goBack = () => !isFirstStep && setCurrentStep(currentStep - 1);

  return (
    <section>
      {/* Step Indicators */}
      <article className="flex justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step.title} className={`h-2.5 rounded-sm flex-1 ${isActive(index) ? "bg-highest" : "bg-gray-300"}`}></div>
        ))}
      </article>

      {/* Step Content */}
      <article className="step-content my-2">
        <p className="text-lg mb-6">
          <span className="font-bold">
            Paso {currentStep + 1} de {steps.length}:&nbsp;
          </span>
          {steps[currentStep].title}
        </p>

        <div className="flex justify-center">{steps[currentStep].content}</div>
      </article>

      {/* Step Controls */}
      <article className="flex justify-center gap-1 items-center">
        {currentStep !== 0 && (
          <>
            <Button addIcon="CircleArrowLeft" onClick={goBack} disabled={isFirstStep} size={40} />
            {steps.map((step, index) => (
              <button
                key={step.title}
                className={`bg-highest w-[14px] ${isActive(index) && "w-[45px]"} h-1 rounded-sm`}
                onClick={() => setCurrentStep(index)}
              ></button>
            ))}
          </>
        )}
        <Button
          addIcon="CircleArrowRight"
          onClick={goNext}
          disabled={!isValidStep || isLastStep}
          size={40}
          className={`${!isValidStep || isLastStep ? "opacity-50 cursor-not-allowed" : ""
            }`}
        />
      </article>
    </section>
  );
};
