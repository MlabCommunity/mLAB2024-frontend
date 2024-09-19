import { Skeleton } from "@nextui-org/react";
import React from "react";

const TakeQuizBoxSkeleton = () => {
  return (
    <div className="border-dashed border-2 border-gray-300 g-[#f4f4f5] p-6 md:justify-between flex flex-col gap-6 shadow-md hover:shadow-lg transition-shadow relative w-full h-auto rounded-lg">
      <div className="flex flex-col gap-2 justify-between items-start w-full">
        <Skeleton className="w-1/2 h-8 rounded-lg" />
        <Skeleton className="w-full h-8 rounded-lg" />
      </div>
      <Skeleton className="w-1/4 h-10 rounded-lg" />
      <Skeleton className="w-full h-10 rounded-lg" />
    </div>
  );
};

export default TakeQuizBoxSkeleton;
