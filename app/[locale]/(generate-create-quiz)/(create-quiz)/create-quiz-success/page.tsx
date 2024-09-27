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
import { getJoinCode } from "@/utils/helpers";
import { useTheme } from "@/app/context/ThemeContext"; 

const CreateQuizSuccessPage = () => {
  const t = useTranslations("CreateQuizSuccess");
  const { generatedQuizData } = useGenerateQuizStore();
  const { theme } = useTheme(); 

  const joinCode = getJoinCode(generatedQuizData?.url);
  
  const handleCopyLink = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(joinCode);
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
            <p
              className={`${
                theme === "dark" ? "text-white" : "text-foreground-600"
              } text-lg`}
            >
              {t("quizSuccessMessage")}
            </p>
            <div
              className={`bg-content2 p-6 gap-6 flex flex-col rounded-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`flex items-center h-[52px] p-3 gap-3 justify-center rounded-lg ${
                  theme === "dark" ? "bg-gray-900" : "bg-white"
                }`}
              >
                
                <span className={`text-sm ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {joinCode}
                </span>
                <Popover>
                  <PopoverTrigger>
                    <Image
                      onClick={handleCopyLink}
                      src={copyIcon}
                      alt="Document Icon"
                      className="cursor-pointer"
                      style={{ filter: theme === "dark" ? "invert(1)" : "invert(0)" }} 
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
                newUrl={joinCode}
              />
            </div>
          </main>
        </form>
      </motion.div>
    </>
  );
};

export default CreateQuizSuccessPage;
