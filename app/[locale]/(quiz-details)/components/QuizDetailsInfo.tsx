import { Skeleton } from "@nextui-org/react";
import React from "react";

interface QuizDetailsInfoProps {
  title: string;
  description: string;
}

const QuizDetailsInfo = ({ title, description }: QuizDetailsInfoProps) => {
  return (
    <>
      <h3 className="font-bold text-lg text-foreground-800">{title}</h3>
      <p className="text-foreground-600">{description}</p>
    </>
  );
};

export default QuizDetailsInfo;
