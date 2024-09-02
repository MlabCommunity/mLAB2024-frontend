"use client";
import { routes } from "@/routes";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Dot from "./Dot/Dot";

const StatusIndicator = () => {
  const currentRoute = usePathname();
  const [visitedRoutes, setVisitedRoutes] = useState<string[]>([]);

  useEffect(() => {
    if (currentRoute && !visitedRoutes.includes(currentRoute)) {
      const updatedVisitedRoutes = [...visitedRoutes, currentRoute];
      setVisitedRoutes(updatedVisitedRoutes);

      // Merge with existing routes in localStorage before updating
      const storedRoutes = JSON.parse(
        localStorage.getItem("visitedRoutes") || "[]"
      );
      const mergedRoutes = Array.from(
        new Set([...storedRoutes, ...updatedVisitedRoutes])
      );

      localStorage.setItem("visitedRoutes", JSON.stringify(mergedRoutes));
    }
  }, [currentRoute, visitedRoutes]);

  useEffect(() => {
    if (currentRoute && !visitedRoutes.includes(currentRoute)) {
      const updatedVisitedRoutes = [...visitedRoutes, currentRoute];
      setVisitedRoutes(updatedVisitedRoutes);
      localStorage.setItem(
        "visitedRoutes",
        JSON.stringify(updatedVisitedRoutes)
      );
    }
  }, [currentRoute, visitedRoutes]);

  return (
    <aside className=" p-4  flex justify-center items-center">
      <div className="flex items-center ">
        {routes.createQuiz.slice(1, 4).map((routeObj, index) => (
          <Dot
            key={index}
            currentRouteProp={routeObj.route}
            step={index}
            visited={visitedRoutes.includes(routeObj.route)} // Ensure the first step is not automatically visited
          />
        ))}
      </div>
    </aside>
  );
};

export default StatusIndicator;
