import Image from "next/image";
import React from "react";
import startContent from "@/public/assets/tick-circle.svg";

const TickCircle = () => {
  return <Image src={startContent} alt={startContent} />;
};

export default TickCircle;
