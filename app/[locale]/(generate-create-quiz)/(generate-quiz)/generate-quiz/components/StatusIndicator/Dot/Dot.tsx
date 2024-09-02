import Link from "next/link";
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
  return (
    <section className="flex items-center">
      <div
        className={`size-8 ${
          visited ? "bg-black" : "bg-content2"
        } rounded-full flex items-center justify-center`}
      >
        <div>
          <span className=" text-foreground-300">
            <Link
              className="w-full h-full flex items-center"
              href={currentRouteProp}
            >
              {step + 1}
            </Link>
          </span>
        </div>
      </div>
      <div className={step >= 2 ? "hidden" : ""}>
        <hr className="w-[80px]" />
      </div>
    </section>
  );
};

export default Dot;
