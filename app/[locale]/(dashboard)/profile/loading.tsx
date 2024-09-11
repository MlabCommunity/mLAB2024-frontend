import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 py-8 w-full md:max-w-7xl">
      <Skeleton className="w-full h-12 rounded-lg" />
      <Skeleton className="w-full h-12 rounded-lg" />
      <Skeleton className="w-full h-72 rounded-lg" />
    </div>
  );
}
