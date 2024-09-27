import React from "react";

import { Skeleton } from "@nextui-org/react";

const StatisticsSkeleton = () => {
  return (
    <div className="bg-Content-content2-light dark:bg-Content-content2-dark py-4 px-4 rounded-lg w-full flex flex-col gap-2">
      <Skeleton className="w-full h-10 rounded-lg" />
      <Skeleton className="w-full h-10 rounded-lg" />
      <Skeleton className="w-full h-10 rounded-lg" />
      <Skeleton className="w-full h-10 rounded-lg" />
    </div>
  );
};

export default StatisticsSkeleton;
