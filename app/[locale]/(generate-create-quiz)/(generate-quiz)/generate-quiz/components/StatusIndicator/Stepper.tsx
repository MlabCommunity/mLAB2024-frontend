"use client";
import React, { useEffect } from "react";
import Dot from "./Dot/Dot";
import { useStepper } from "@/app/context/StepContext";

const Stepper = () => {
  const {
    stepperRoutes,
    visitedRoutes,
    currentRoute,
    updateLocalStorageRoutes,
  } = useStepper();

  useEffect(() => {
    updateLocalStorageRoutes();
  }, [currentRoute]);
  return (
    <aside className="p-4 flex justify-center items-center">
      <div className="flex items-center">
        {stepperRoutes.map((routeObj, index) => (
          <Dot
            key={index}
            currentRouteProp={routeObj.route}
            step={index}
            visited={visitedRoutes.includes(routeObj.route)}
          />
        ))}
      </div>
    </aside>
  );
};

export default Stepper;
