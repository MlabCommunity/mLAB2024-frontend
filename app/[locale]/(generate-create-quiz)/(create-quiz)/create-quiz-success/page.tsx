"use client";

import React from "react";
import BackToDashboard from "../../(generate-quiz)/components/buttons/BackToDashboard";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import copyIcon from "@/public/assets/document-copy.svg";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
const CreateQuizSuccessPage = () => {
  const t = useTranslations("CreateQuizSuccess");
  const { generatedQuizData } = useGenerateQuizStore();
  const handleCopyLink = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(generatedQuizData?.url);
  };
  return (
    <>
      <Confetti recycle={false} className="w-screen h-screen" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form action="">
          <main className="p-3 flex flex-col gap-6">
            <h2 className="text-4xl font-semibold">
              {t("quizSuccessHeading")}
            </h2>
            <p className="text-foreground-600 text-lg">
              {t("quizSuccessMessage")}
            </p>
            <div className="bg-content2 p-6 gap-6 flex flex-col rounded-lg">
              <div className=" flex items-center h-[52px] bg-white p-3 gap-3 justify-center rounded-lg">
                <span className="text-sm">{generatedQuizData?.url}</span>
                <Popover>
                  <PopoverTrigger>
                    <Image
                      onClick={handleCopyLink}
                      src={copyIcon}
                      alt="Document Icon"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        {t("linkCopiedMsg")}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <BackToDashboard
                quizId={generatedQuizData?.id}
                newUrl={generatedQuizData.url}
              />
            </div>
          </main>
        </form>
      </motion.div>
    </>
  );
};

export default CreateQuizSuccessPage;
