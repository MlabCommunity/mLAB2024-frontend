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
  // Effect to mark the initial route as visited on mount
  useEffect(() => {
    console.log("Pathname on mount:", pathname);

    // If we are navigating to generate-quiz, we want to ensure it's visited
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

  // Effect to handle current route changes
  useEffect(() => {
    console.log("Current Route:", currentRoute);
    console.log("Visited Routes before adding:", visitedRoutes);
    if (currentRoute) {
      const isValidStepperRoute = stepperRoutes.some(
        (step) => step.route === currentRoute
      );
      if (isValidStepperRoute && !visitedRoutes.includes(currentRoute)) {
        addVisitedRoute(currentRoute);
        console.log(`Added Current Route: ${currentRoute} to Visited Routes.`);
      }
    }
  }, [currentRoute, stepperRoutes, visitedRoutes, addVisitedRoute]);

  // New effect to handle pathname changes (URL changes)
  useEffect(() => {
    console.log("Pathname changed:", pathname);
    const isValidStepperRoute = stepperRoutes.some(
      (step) => step.route === pathname
    );

    if (isValidStepperRoute) {
      if (pathname !== currentRoute) {
        console.log("Valid stepper route detected, updating state");
        setCurrentRoute(pathname);

        // Only reset visited routes if we're moving to a new valid route
        if (!visitedRoutes.includes(pathname)) {
          resetVisitedRoutes(); // Reset the visited routes
          addVisitedRoute(pathname); // Add the new current route to visited routes
        }
      }
    } else {
      console.log("Not a valid stepper route");
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

  // Effect to handle back navigation
  useEffect(() => {
    const handlePopState = () => {
      console.log("Back Navigation Detected");
      if (visitedRoutes.length > 1) {
        const newVisitedRoutes = [...visitedRoutes]; // Copy the visited routes
        const lastVisited = newVisitedRoutes[newVisitedRoutes.length - 2]; // Get the second last visited route
        setCurrentRoute(lastVisited); // Update current route
        newVisitedRoutes.pop(); // Remove the last visited route
        resetVisitedRoutes(); // Reset visited routes
        newVisitedRoutes.forEach((route) => addVisitedRoute(route)); // Re-add remaining routes
        console.log(`Navigating back to: ${lastVisited}`);
      } else if (visitedRoutes.length === 1) {
        setCurrentRoute(visitedRoutes[0]);
      }
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", handlePopState);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [visitedRoutes, resetVisitedRoutes, setCurrentRoute, addVisitedRoute]);

  console.log("Final Visited Routes:", visitedRoutes);

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
