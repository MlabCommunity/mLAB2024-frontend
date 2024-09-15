import { Skeleton } from "@nextui-org/react";
import React from "react";

const DashboardLoading = () => {
  return (
    <>
      <Skeleton className="rounded-lg w-full h-36" />
      <Skeleton className="rounded-lg w-full h-36" />
      <Skeleton className="rounded-lg w-full h-36" />
      <Skeleton className="rounded-lg w-full h-36" />
    </>
  );
};

export default DashboardLoading;
