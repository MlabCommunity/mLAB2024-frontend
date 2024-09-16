import Header from "@/components/shared/Header";
import React, { ReactNode } from "react";
import Stepper from "./(generate-quiz)/components/StatusIndicator/Stepper";
import StepperProvider from "@/app/context/StepContext";
import { Metadata } from "next";
import { routes } from "@/routes";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <StepperProvider>
      <main>
        <Header />
        <section className="md:w-[55rem] mx-auto gap-6 flex flex-col ">
          <Stepper />
          {children}
        </section>
      </main>
    </StepperProvider>
  );
};

export default layout;
