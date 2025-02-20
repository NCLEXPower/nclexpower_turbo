import { createContext, useCallback, useContext } from "react";
import { TourProvider, StepType, useTour } from "@reactour/tour";

interface TourContextProps {
  startTour: (steps: StepType[]) => void;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const useTourContext = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTourContext must be used within a TourProviderWrapper");
  }
  return context;
};

export const TourContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
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

  return (
    <TourProvider
      steps={[]}
      padding={{
        mask: 2,
        popover: [5, 10],
      }}
      styles={style}
      badgeContent={({ totalSteps, currentStep }) =>
        `${currentStep + 1}/${totalSteps}`
      }
    >
      <TourContextInner>{children}</TourContextInner>
    </TourProvider>
  );
};

const TourContextInner: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { setIsOpen, setSteps, setCurrentStep } = useTour();

  const startTour = useCallback(
    (steps: StepType[]) => {
      setSteps?.(steps);
      setCurrentStep(0);
      setIsOpen(!!steps.length);
    },
    [setSteps, setCurrentStep, setIsOpen]
  );

  return (
    <TourContext.Provider value={{ startTour }}>
      {children}
    </TourContext.Provider>
  );
};
