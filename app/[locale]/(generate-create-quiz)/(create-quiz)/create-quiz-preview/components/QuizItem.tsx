"use client";
import Image from "next/image";
import React from "react";
import thrash from "/public/assets/trash.svg";
import edit from "/public/assets/edit-2.svg";
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
            {`${number}.`}
            {question}
          </h2>
          <div className="flex  gap-2">
            <button
              className="w-[22px]"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleEdit();
              }}
            >
              <Image src={edit} alt="edit" />
            </button>
            <button
              className="w-[22px]"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleDelete();
              }}
            >
              <Image src={thrash} alt="delete" />
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
