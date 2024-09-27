import React from "react";

import { Skeleton } from "@nextui-org/react";

const SettingsSkeleton = () => {
  return (
    <div className="bg-Content-content2-light dark:bg-Content-content2-dark py-4 px-4 rounded-lg w-full flex flex-col gap-5">
      <Skeleton className="w-full h-10 rounded-lg" />
      <Skeleton className="w-full  h-20 rounded-lg" />
      <Skeleton className="ml-auto w-1/4 h-10 rounded-lg" />
    </div>
  );
};

export default SettingsSkeleton;
