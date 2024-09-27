import Header from "@/components/shared/Header";
import React, { ReactNode } from "react";
import Stepper from "./(generate-quiz)/components/StatusIndicator/Stepper";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <div className="relative"></div>
      <section className="md:w-[55rem] mx-auto gap-6 flex flex-col">
        <Stepper />
        {children}
      </section>
    </main>
  );
};

export default layout;
