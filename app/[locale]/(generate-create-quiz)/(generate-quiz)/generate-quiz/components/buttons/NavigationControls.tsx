import React, { ReactNode } from "react";
import CancelButton from "./CancelButton";

const NavigationControls = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-end pt-6">
      <div className="flex items-center  gap-8">
        <CancelButton />
        {children}
      </div>
    </div>
  );
};

export default NavigationControls;
