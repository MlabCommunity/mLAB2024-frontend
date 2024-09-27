import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import editIcon from "/public/assets/edit.svg";
import binIcon from "/public/assets/bin.svg";
import { QuestionsT } from "../types";
import { cn } from "@/lib";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0, transition: { duration: 0.5 } },
};

type Props = {
  question: QuestionsT;
  handleEditQuestion: (index: number) => void;
  handleDeleteQuestion: (index: number) => void;
  showAnswers: boolean;
  index: number;
  isDarkTheme: boolean; 
};

function Question({
  question,
  handleEditQuestion,
  handleDeleteQuestion,
  showAnswers,
  index,
  isDarkTheme, 
}: Props) {
  return (
    <motion.li
      key={question.id}
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={itemVariants}
      className={`p-4 mb-4 border-dashed border-2 rounded-lg flex justify-between items-start shadow-sm list-none ${isDarkTheme ? 'bg-gray-700' : 'bg-default-100'}`}
    >
      <div className="w-full">
        <h4 className={`font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-foreground-700'}`}>
          {index + 1}. {question?.title}
        </h4>
        <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-foreground-500'}`}>
          {question?.description}
        </p>

        <div className="space-y-2 mt-2">
          {question?.answers?.map((answer: any, i: number) => (
            <motion.div
              key={i}
              className={cn(
                "flex items-center p-2 rounded-lg cursor-pointer",
                answer.isCorrect && showAnswers ? "bg-success-100" : (isDarkTheme ? 'bg-gray-600' : 'bg-white')
              )}
            >
              <span className={`font-medium ${isDarkTheme ? 'text-white' : 'text-foreground-700'}`}>
                {String.fromCharCode(65 + i)}
              </span>
              <div className={`border-l border-b-gray-700 h-6 mx-2`} />
              <span className={`text-foreground-700 ${isDarkTheme ? 'text-gray-200' : 'text-foreground-700'}`}>
                {answer.content}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => handleEditQuestion(index)}>
          <Image src={editIcon} alt="edit icon" />
        </button>
        <button onClick={() => handleDeleteQuestion(index)}>
          <Image src={binIcon} alt="bin icon" />
        </button>
      </div>
    </motion.li>
  );
}

export default Question;
