import React, { createContext, useContext, useState, ReactNode } from "react";

interface StepValidationContextProps {
  isValidStep: boolean;
  currentStep: number;
  setIsValidStep: (isValid: boolean) => void;
  setCurrentStep: (step: number) => void;
}

const StepValidationContext = createContext<StepValidationContextProps | undefined>(undefined);

export const StepValidationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isValidStep, setIsValidStep] = useState(false);

  const value = React.useMemo(() => ({
    isValidStep,
    setIsValidStep,
    currentStep,
    setCurrentStep
  }), [isValidStep, currentStep]);

  return (
    <StepValidationContext.Provider value={value}>
      {children}
    </StepValidationContext.Provider>
  );
};

export const useStepValidation = (): StepValidationContextProps => {
  const context = useContext(StepValidationContext);
  if (!context) {
    throw new Error("useStepValidation must be used within a StepValidationProvider");
  }
  return context;
};