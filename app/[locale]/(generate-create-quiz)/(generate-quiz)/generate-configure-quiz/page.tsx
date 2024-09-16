"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ButtonGroupComponent from "../components/ButtonsGroupComponent";

const GenerateConfigureQuiz = () => {
  const t = useTranslations("ConfigureQuiz");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <aside className="md:w-[55rem] mx-auto flex flex-col gap-6 p-3">
        <h2 className="text-4xl leading-10 font-semibold text-foreground-700">
          {t("configureQuizHeading")}
        </h2>
        <span className="text-foreground-700">{t("configureQuizMessage")}</span>
        <ButtonGroupComponent />
      </aside>
    </motion.div>
  );
};

export default GenerateConfigureQuiz;
