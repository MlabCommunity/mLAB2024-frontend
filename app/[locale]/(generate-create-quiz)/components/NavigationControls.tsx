import React from "react";
import CancelButton from "../(generate-quiz)/components/buttons/CancelButton";

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
