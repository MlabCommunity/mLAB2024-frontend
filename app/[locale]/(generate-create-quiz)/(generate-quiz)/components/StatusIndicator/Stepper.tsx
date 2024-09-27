"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Dot from "../Dot/Dot";
import { useStepperStore } from "@/store/stepperStore";
import { routes } from "@/routes";

const Stepper = () => {
  const pathname = usePathname();
  const {
    setCurrentRoute,
    stepperRoutes,
    currentRoute,
    visitedRoutes,
    addVisitedRoute,
    resetVisitedRoutes,
  } = useStepperStore();

  useEffect(() => {
    if (pathname === routes.generateQuiz.pathname) {
      if (!visitedRoutes.includes(routes.generateQuiz.pathname)) {
        addVisitedRoute(routes.generateQuiz.pathname);
      }
      setCurrentRoute(routes.generateQuiz.pathname);
    } else {
      const isValidStepperRoute = stepperRoutes.some(
        (step) => step.route === pathname
      );
      if (isValidStepperRoute) {
        setCurrentRoute(pathname);
      } else {
        resetVisitedRoutes();
      }
    }
  }, [
    pathname,
    visitedRoutes,
    addVisitedRoute,
    setCurrentRoute,
    resetVisitedRoutes,
    stepperRoutes,
  ]);

  useEffect(() => {
    if (currentRoute) {
      const isValidStepperRoute = stepperRoutes.some(
        (step) => step.route === currentRoute
      );
      if (isValidStepperRoute && !visitedRoutes.includes(currentRoute)) {
        addVisitedRoute(currentRoute);
      }
    }
  }, [currentRoute, stepperRoutes, visitedRoutes, addVisitedRoute]);

  useEffect(() => {
    const isValidStepperRoute = stepperRoutes.some(
      (step) => step.route === pathname
    );

    if (isValidStepperRoute) {
      if (pathname !== currentRoute) {
        setCurrentRoute(pathname);

        if (!visitedRoutes.includes(pathname)) {
          resetVisitedRoutes();
          addVisitedRoute(pathname);
        }
      }
    } else {
      resetVisitedRoutes();
    }
  }, [
    pathname,
    stepperRoutes,
    currentRoute,
    setCurrentRoute,
    resetVisitedRoutes,
    addVisitedRoute,
  ]);

  useEffect(() => {
    const handlePopState = () => {
      if (visitedRoutes.length > 1) {
        const newVisitedRoutes = [...visitedRoutes]; // Copy the visited routes
        const lastVisited = newVisitedRoutes[newVisitedRoutes.length - 2]; // Get the second last visited route
        setCurrentRoute(lastVisited); // Update current route
        newVisitedRoutes.pop(); // Remove the last visited route
        resetVisitedRoutes(); // Reset visited routes
        newVisitedRoutes.forEach((route) => addVisitedRoute(route)); // Re-add remaining routes
      } else if (visitedRoutes.length === 1) {
        setCurrentRoute(visitedRoutes[0]);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [visitedRoutes, resetVisitedRoutes, setCurrentRoute, addVisitedRoute]);

  return (
    <aside className="p-4 flex justify-center items-center">
      <div className="flex items-center">
        {stepperRoutes.map((routeObj, index) => (
          <Dot
            key={index}
            step={index}
            visited={visitedRoutes.includes(routeObj.route)} // Check if this step is visited
          />
        ))}
      </div>
    </aside>
  );
};

export default Stepper;
