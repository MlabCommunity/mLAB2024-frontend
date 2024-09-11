import React from "react";

import { Skeleton } from "@nextui-org/react";

const QuestionsSkeleton = () => {
  return (
    <div className=" bg-content2 py-4 px-4 rounded-lg">
      <div className="flex justify-between w-full">
        <Skeleton className="w-36 lg:w-72 h-9 rounded-lg" />
        <Skeleton className="w-36 h-9 rounded-lg" />
      </div>
      <Skeleton className="w-36 h-9 rounded-lg ml-auto mt-5" />

      <div className="mt-5">
        <div className="flex justify-between w-full py-5">
          <Skeleton className=" w-36 lg:w-72 h-10 rounded-lg" />
          <Skeleton className="w-36 h-10 rounded-lg" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between w-full py-5">
          <Skeleton className=" w-36 lg:w-72 h-10 rounded-lg" />
          <Skeleton className="w-36 h-10 rounded-lg" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default QuestionsSkeleton;
