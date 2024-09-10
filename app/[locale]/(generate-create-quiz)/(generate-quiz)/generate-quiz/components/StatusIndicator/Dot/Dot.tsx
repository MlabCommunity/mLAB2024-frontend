import { cn } from "@/lib";
import { routes } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Dot = ({
  step,
  visited,
  currentRouteProp,
}: {
  step: number;
  currentRouteProp: string;
  visited: boolean;
}) => {
  const curRoute = usePathname();
  return (
    <section className="flex items-center">
      <div
        className={cn(
          "size-8 rounded-full flex items-center justify-center pointer-events-none",
          visited ? "bg-black" : "bg-content2"
        )}
      >
        <div>
          {visited && curRoute !== routes.createQuiz[3].route ? (
            <Link
              className="w-full h-full flex items-center"
              href={currentRouteProp}
            >
              <span className="text-foreground-300">{step + 1}</span>
            </Link>
          ) : (
            <span className="text-foreground-300">{step + 1}</span>
          )}
        </div>
      </div>
      <div className={step >= 2 ? "hidden" : ""}>
        <hr className="w-[80px]" />
      </div>
    </section>
  );
};

export default Dot;
