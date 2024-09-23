"use client";

import React from "react";
import animationData from "@/public/lotties/TakeQuizLoading.json";
import Lottie from "react-lottie";
import { useTranslations } from "next-intl";

const JoiningState = () => {
  const t = useTranslations("Guest");
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-10">
      <div className="flex flex-col items-center -mt-40">
        <Lottie options={defaultOptions} height={400} width={400} />
        <p className="text-5xl sm:text-7xl font-semibold animate-bounce -mt-10 text-primary">
          {t("joining")}
        </p>
      </div>
    </div>
  );
};

export default JoiningState;
