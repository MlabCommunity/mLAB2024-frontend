import Image from "next/image";
import React from "react";
import emptyCircle from "@/public/assets/record.svg";

const EmptyCircle = () => {
  return <Image src={emptyCircle} alt="empty-circle" />;
};

export default EmptyCircle;
