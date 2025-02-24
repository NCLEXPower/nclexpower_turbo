import { useState, useCallback } from "react";
import { Tour, StepType, components } from "@reactour/tour";
import { Button } from "../components";

type CloseProps = React.ComponentProps<typeof components.Close>;

const CustomCloseButton: React.FC<CloseProps> = ({ onClick }) => (
  <div className="w-full mb-2">
    <Button
      onClick={onClick}
      sx={{
        fontWeight: "bold",
        minHeight: "30px",
        minWidth: "100px",
        borderRadius: "15px",
        fontSize: "12px",
        p: 0,
        m: 0,
      }}
    >
      Close Tour
    </Button>
  </div>
);

export const useTourManager = (tourSteps: StepType[] = []) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<StepType[]>(tourSteps);
  const [disabledActions, setDisabledActions] = useState(false);

  const radius = 4;
  const style = {
    popover: (base: any) => ({
      ...base,
      borderRadius: radius,
    }),
    maskArea: (base: any) => ({ ...base, rx: radius }),
    badge: (base: any) => ({ ...base, left: "auto", right: "-0.8125em" }),
    controls: (base: any) => ({ ...base, marginTop: 100 }),
    close: (base: any) => ({ ...base, right: "auto", left: 8, top: 8 }),
  };

  const startTour = useCallback(() => {
    setSteps(tourSteps);
    setCurrentStep(0);
    setIsOpen(!!tourSteps.length);
  }, [tourSteps]);

  const TourComponent = isOpen ? (
    <Tour
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      steps={steps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      disabledActions={disabledActions}
      setDisabledActions={setDisabledActions}
      styles={style}
      components={{ Close: CustomCloseButton }}
      badgeContent={({ totalSteps, currentStep }) =>
        `${currentStep + 1}/${totalSteps}`
      }
      onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (!steps || !steps.length) return;
        const nextStep = currentStep + 1;
        if (nextStep === steps.length) setIsOpen(false);
        setCurrentStep(nextStep);
      }}
    />
  ) : null;

  return { startTour, TourComponent };
};
