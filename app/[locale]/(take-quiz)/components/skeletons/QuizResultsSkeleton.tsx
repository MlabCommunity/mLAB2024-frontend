import { Skeleton } from "@nextui-org/react";
import React from "react";

const QuizResultsSkeleton = () => {
  return (
    <div className="bg-default-100 px-6 py-6 pt-8 rounded-xl flex flex-col gap-8 items-center w-[700px]">
      <Skeleton className="w-full h-9 rounded-lg" />
      <div className="w-full flex flex-col gap-3">
        <Skeleton className="w-1/2 h-9 rounded-lg" />
        <Skeleton className="w-full h-9 rounded-lg" />
        <Skeleton className="w-1/2 h-9 rounded-lg" />
        <Skeleton className="mx-auto w-1/2 h-9 rounded-lg" />
        <Skeleton className="mx-auto w-1/2 h-9 rounded-lg" />
        <Skeleton className="mx-auto w-1/2 h-20 rounded-lg" />
      </div>
      <Skeleton className="ml-auto w-32 h-9 rounded-lg" />
    </div>
  );
};

export default QuizResultsSkeleton;
