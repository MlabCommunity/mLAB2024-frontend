import { create } from "zustand";
import { persist } from "zustand/middleware";
import { routes } from "@/routes";

type StepperRoute = {
  route: string;
};

interface StepperState {
  visitedRoutes: string[];
  currentRoute: string | null;
  stepperRoutes: StepperRoute[];
  addVisitedRoute: (route: string) => void;
  setCurrentRoute: (route: string) => void;
  resetVisitedRoutes: () => void;
}

export const useStepperStore = create<StepperState>()(
  persist(
    (set) => ({
      visitedRoutes: [],
      currentRoute: null,
      stepperRoutes: [
        { route: routes.generateQuiz.pathname },
        { route: routes.configureQuiz.pathname },
        { route: routes.quizPreview.pathname },
        { route: routes.quizSuccess.pathname },
      ].slice(1, 4),
      addVisitedRoute: (route) =>
        set((state) => ({
          visitedRoutes: state.visitedRoutes.includes(route)
            ? state.visitedRoutes
            : [...state.visitedRoutes, route],
        })),
      setCurrentRoute: (route) => set({ currentRoute: route }),
      resetVisitedRoutes: () => set({ visitedRoutes: [] }),
    }),
    {
      name: "stepper-storage",
    }
  )
);
