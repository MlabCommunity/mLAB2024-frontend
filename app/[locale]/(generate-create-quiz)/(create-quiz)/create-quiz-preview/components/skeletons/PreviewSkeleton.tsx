import { Skeleton } from "@nextui-org/react";
import React from "react";

const PreviewSkeleton = () => {
  return (
    <div className="bg-content2 p-6 mt-5 gap-6 flex flex-col">
      <div className="flex justify-between w-full">
        <Skeleton className="w-36 h-10 rounded-lg" />
        <Skeleton className="w-36 h-10 rounded-lg" />
      </div>
      <Skeleton className="w-36 h-10 rounded-lg self-end" />
      <Skeleton className="h-10 rounded-lg w-full" />
      <div>
        <Skeleton className="h-10 rounded-lg w-3/4" />
        <Skeleton className="h-10 rounded-lg w-3/4" />
        <Skeleton className="h-10 rounded-lg w-3/4" />
        <Skeleton className="h-10 rounded-lg w-3/4" />
      </div>
      <div>
        <Skeleton className="h-10 rounded-lg w-3/4" />
        <Skeleton className="h-10 rounded-lg w-3/4" />
        <Skeleton className="h-10 rounded-lg w-3/4" />
        <Skeleton className="h-10 rounded-lg w-3/4" />
      </div>
      <div>
        <Skeleton className="h-10 rounded-lg w-3/4" />
        <Skeleton className="h-10 rounded-lg w-3/4" />
        <Skeleton className="h-10 rounded-lg w-3/4" />
        <Skeleton className="h-10 rounded-lg w-3/4" />
      </div>
    </div>
  );
};

export default PreviewSkeleton;
