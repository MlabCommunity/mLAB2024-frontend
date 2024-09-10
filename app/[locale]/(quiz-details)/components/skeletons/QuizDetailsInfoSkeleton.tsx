import { Skeleton } from "@nextui-org/react";
import React from "react";

const QuizDetailsInfoSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-1/2 h-10 rounded-lg" />
      <Skeleton className="w-3/4 h-7 rounded-lg" />
    </div>
  );
};

export default QuizDetailsInfoSkeleton;
