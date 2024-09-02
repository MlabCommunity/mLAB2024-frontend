import Header from "@/components/shared/Header";
import React, { ReactNode } from "react";
import StatusIndicator from "./(generate-quiz)/generate-quiz/components/StatusIndicator/StatusIndicator";
import StepContextProvider from "@/app/context/StepContext";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <StepContextProvider>
      <main>
        <Header />
        <section className="md:w-[55rem] mx-auto gap-6 flex flex-col ">
          <StatusIndicator />
          {children}
        </section>
      </main>
    </StepContextProvider>
  );
};

export default layout;
