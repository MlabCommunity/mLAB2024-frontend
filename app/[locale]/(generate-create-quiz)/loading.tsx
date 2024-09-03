import { Button, Card, Skeleton, Spinner } from "@nextui-org/react";

export default function Loading() {
  const skeleton = `
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {quizzes.map((_, index) => (
            <div
              className=" p-3 md:justify-between  flex flex-col shadow-md hover:shadow-lg transition-shadow relative w-full sm:w-auto h-auto rounded-lg"
              key={index}
            >
              <Skeleton className="w-full h-[9.5rem]" />{" "}
              {/* Placeholder for quiz card content */}
            </div>
          ))}
        </div>`;
  return (
    <>
      {/* Quiz Cards Loading Skeletons */}
      <section className="py-8 w-full md:max-w-7xl">
        <Spinner className="w-full h-full" labelColor="primary" />
      </section>
    </>
  );
}
