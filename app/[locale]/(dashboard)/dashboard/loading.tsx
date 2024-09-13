import { Skeleton } from "@nextui-org/react";
import React from "react";

const DashboardLoading = () => {
  return (
    <section className="py-8 w-full md:max-w-7xl ">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-5 font-semibold">
        <Skeleton className="rounded-lg w-1/4 h-10" />
        <Skeleton className="rounded-lg w-1/4 h-10" />
      </div>
      <Skeleton className="rounded-lg w-1/2 h-10 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        <Skeleton className="rounded-lg w-full h-36" />
        <Skeleton className="rounded-lg w-full h-36" />
        <Skeleton className="rounded-lg w-full h-36" />
        <Skeleton className="rounded-lg w-full h-36" />
      </div>
      <Skeleton className="rounded-lg w-1/2 h-12 mx-auto my-5" />
      <Skeleton className="rounded-lg w-full h-24 mx-auto my-5" />
    </section>
  );
};

export default DashboardLoading;
