"use client";
import { routes } from "@/routes";
import { usePathname } from "next/navigation";
import React, {
  useState,
  createContext,
  ReactNode,
  SetStateAction,
} from "react";

type stepperRoutes = {
  route: string;
};
interface StepContextProps {
  visitedRoutes: string[];
  setVisitedRoutes: React.Dispatch<SetStateAction<string[]>>;
  stepperRoutes: stepperRoutes[];
  currentRoute: string;
  updateLocalStorageRoutes: () => void;
}

const StepperContext = createContext<StepContextProps | undefined>(undefined);

function StepperProvider({ children }: { children: ReactNode }) {
  const [visitedRoutes, setVisitedRoutes] = useState<string[]>([]);

  const stepperRoutes = routes.createQuiz.slice(1, 4);

  const currentRoute = usePathname();

  const updateLocalStorageRoutes = () => {
    const storedRoutes = JSON.parse(
      localStorage.getItem("visitedRoutes") || "[]"
    );
    setVisitedRoutes(storedRoutes);

    if (currentRoute && !storedRoutes.includes(currentRoute)) {
      const updatedVisitedRoutes = [...storedRoutes, currentRoute];
      localStorage.setItem(
        "visitedRoutes",
        JSON.stringify(updatedVisitedRoutes)
      );
      setVisitedRoutes(updatedVisitedRoutes);
    }
  };

  return (
    <StepperContext.Provider
      value={{
        stepperRoutes,
        visitedRoutes,
        setVisitedRoutes,
        currentRoute,
        updateLocalStorageRoutes,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
}

export const useStepper = () => {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepContextProvider");
  }
  return context;
};

export default StepperProvider;
