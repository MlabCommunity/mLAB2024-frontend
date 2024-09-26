"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import { cn } from "@/lib";
import { motion } from "framer-motion";

type QuizItemProps = {
  questionId: number;
  question: string;
  number: number;
  generateAnswers: { content: string; isCorrect: boolean }[];
  showCorrectAnswers?: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0, transition: { duration: 0.5 } },
};

const QuizItem = ({
  questionId,
  question,
  generateAnswers,
  number,
  handleDelete,
  handleEdit,
  showCorrectAnswers,
}: QuizItemProps) => {
  const labels = ["A", "B", "C", "D"];
  return (
    <motion.li
      data-question-id={questionId}
      className="relative flex flex-col gap-4 my-1"
      initial="hidden"
      key={questionId}
      layout
      animate="visible"
      exit="exit"
      variants={itemVariants}
    >
      <div className="flex flex-col gap-4 pt-4 border-[1.5px] border-dashed rounded-lg pb-4 pl-6 pr-6">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-[16px] leading-6 ">
            {`${number}. `}
            {question}
          </h2>
          <div className="flex  gap-2">
            <button
              className="hover:scale-110 text-[#71717A] hover:text-primary transition-all w-[22px]"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleEdit();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#71717A"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z"
                  className="fill-current"
                />
                <path
                  d="M19.0206 3.47997C17.0806 1.53997 15.1806 1.48997 13.1906 3.47997L11.9806 4.68997C11.8806 4.78997 11.8406 4.94997 11.8806 5.08997C12.6406 7.73997 14.7606 9.85997 17.4106 10.62C17.4506 10.63 17.4906 10.64 17.5306 10.64C17.6406 10.64 17.7406 10.6 17.8206 10.52L19.0206 9.30997C20.0106 8.32997 20.4906 7.37997 20.4906 6.41997C20.5006 5.42997 20.0206 4.46997 19.0206 3.47997Z"
                  className="fill-current"
                />
                <path
                  d="M15.6103 11.53C15.3203 11.39 15.0403 11.25 14.7703 11.09C14.5503 10.96 14.3403 10.82 14.1303 10.67C13.9603 10.56 13.7603 10.4 13.5703 10.24C13.5503 10.23 13.4803 10.17 13.4003 10.09C13.0703 9.80999 12.7003 9.44999 12.3703 9.04999C12.3403 9.02999 12.2903 8.95999 12.2203 8.86999C12.1203 8.74999 11.9503 8.54999 11.8003 8.31999C11.6803 8.16999 11.5403 7.94999 11.4103 7.72999C11.2503 7.45999 11.1103 7.18999 10.9703 6.90999C10.9491 6.86459 10.9286 6.81943 10.9088 6.77452C10.7612 6.44121 10.3265 6.34376 10.0688 6.60152L4.34032 12.33C4.21032 12.46 4.09032 12.71 4.06032 12.88L3.52032 16.71C3.42032 17.39 3.61032 18.03 4.03032 18.46C4.39032 18.81 4.89032 19 5.43032 19C5.55032 19 5.67032 18.99 5.79032 18.97L9.63032 18.43C9.81032 18.4 10.0603 18.28 10.1803 18.15L15.9016 12.4287C16.1612 12.1691 16.0633 11.7237 15.7257 11.5796C15.6877 11.5634 15.6492 11.5469 15.6103 11.53Z"
                  className="fill-current"
                />
              </svg>
            </button>
            <button
              className="hover:scale-110 text-[#71717A] hover:text-danger transition-all w-[22px]"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleDelete();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#71717A"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.0699 5.23C19.4599 5.07 17.8499 4.95 16.2299 4.86V4.85L16.0099 3.55C15.8599 2.63 15.6399 1.25 13.2999 1.25H10.6799C8.34991 1.25 8.12991 2.57 7.96991 3.54L7.75991 4.82C6.82991 4.88 5.89991 4.94 4.96991 5.03L2.92991 5.23C2.50991 5.27 2.20991 5.64 2.24991 6.05C2.28991 6.46 2.64991 6.76 3.06991 6.72L5.10991 6.52C10.3499 6 15.6299 6.2 20.9299 6.73C20.9599 6.73 20.9799 6.73 21.0099 6.73C21.3899 6.73 21.7199 6.44 21.7599 6.05C21.7899 5.64 21.4899 5.27 21.0699 5.23Z"
                  className="fill-current"
                />
                <path
                  d="M19.23 8.14C18.99 7.89 18.66 7.75 18.32 7.75H5.67999C5.33999 7.75 4.99999 7.89 4.76999 8.14C4.53999 8.39 4.40999 8.73 4.42999 9.08L5.04999 19.34C5.15999 20.86 5.29999 22.76 8.78999 22.76H15.21C18.7 22.76 18.84 20.87 18.95 19.34L19.57 9.09C19.59 8.73 19.46 8.39 19.23 8.14ZM13.66 17.75H10.33C9.91999 17.75 9.57999 17.41 9.57999 17C9.57999 16.59 9.91999 16.25 10.33 16.25H13.66C14.07 16.25 14.41 16.59 14.41 17C14.41 17.41 14.07 17.75 13.66 17.75ZM14.5 13.75H9.49999C9.08999 13.75 8.74999 13.41 8.74999 13C8.74999 12.59 9.08999 12.25 9.49999 12.25H14.5C14.91 12.25 15.25 12.59 15.25 13C15.25 13.41 14.91 13.75 14.5 13.75Z"
                  className="fill-current"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {generateAnswers?.map((option, index) => (
            <Button
              key={index}
              variant="flat"
              color="default"
              className={cn("justify-start items-center flex", {
                "bg-success-100": showCorrectAnswers && option.isCorrect,
                "text-success-700": showCorrectAnswers && option.isCorrect,
              })}
            >
              {labels[index]}
              <Divider
                orientation="vertical"
                className="w-[1px] ml-2 mr-2 h-3/5"
              />
              {option.content}
            </Button>
          ))}
        </div>
      </div>
    </motion.li>
  );
};

export default QuizItem;
