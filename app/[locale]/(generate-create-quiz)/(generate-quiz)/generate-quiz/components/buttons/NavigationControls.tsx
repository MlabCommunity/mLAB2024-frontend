import React, { ReactNode } from "react";
import CancelButton from "./CancelButton";
import InsertFileButton from "./InsertFileButton";

interface NavigationControlsProps {
  isPending?: boolean;
  children: React.ReactNode;
}

const NavigationControls = ({
  children,
  isPending,
}: NavigationControlsProps) => {
  return (
    <div className="flex justify-end pt-6">
      <div className="flex items-center  gap-8">
        <CancelButton isPending={isPending} />
        {children}
      </div>
    </div>
  );
};

export default NavigationControls;
