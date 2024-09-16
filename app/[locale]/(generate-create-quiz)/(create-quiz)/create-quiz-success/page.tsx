"use client";

import React from "react";
import BackToDashboard from "../../(generate-quiz)/components/buttons/BackToDashboard";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const CreateQuizSuccessPage = () => {
  const t = useTranslations("CreateQuizSuccess");
  return (
    <>
      <Confetti recycle={false} className="w-screen h-screen" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <main className="p-3 flex flex-col gap-6">
          <h2 className="text-4xl font-semibold">{t("quizSuccessHeading")}</h2>
          <p className="text-foreground-600 text-lg">
            {t("quizSuccessMessage")}
          </p>
          <div className="bg-content2 p-6 gap-6 flex flex-col rounded-lg">
            <div className=" flex items-center h-[52px] bg-white p-3  gap-3 justify-center rounded-lg">
              <span className="text-lg">link.com/unique-id123</span>
              {/* <Image src={documentIcon} alt="Document Icon" /> */}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <BackToDashboard />
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default CreateQuizSuccessPage;
