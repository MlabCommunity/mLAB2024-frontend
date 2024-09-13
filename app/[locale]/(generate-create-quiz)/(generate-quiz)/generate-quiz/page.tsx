"use client";

import React from "react";
import PromptForm from "./components/forms/PromptForm";
import InsertFileModal from "@/app/[locale]/(quiz-details)/modals/InsertFileModal";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const GenerateQuizPage = () => {
  const t = useTranslations("CreateQuiz");
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex flex-col gap-6 p-3 md:w-[55rem] mx-auto ">
          <h2 className="text-4xl font-semibold">{t("createQuizHeading")}</h2>
          <p className="text-foreground-700">{t("createQuizMessage")}</p>
          <article className="rounded-lg">
            <PromptForm />
          </article>
        </div>
        <InsertFileModal />
      </motion.div>
    </>
  );
};

export default GenerateQuizPage;
