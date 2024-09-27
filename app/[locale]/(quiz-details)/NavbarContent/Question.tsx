import React from "react";
import { motion } from "framer-motion";
import { QuestionsT } from "../types";
import { cn } from "@/lib";
import { DeleteButton } from "@/components/DeleteButton";
import { EditButton } from "@/components/EditButton";

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
};

function Question({
  question,
  handleEditQuestion,
  handleDeleteQuestion,
  showAnswers,
  index,
}: Props) {
  return (
    <motion.li
      key={question.id}
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={itemVariants}
      className="bg-default-100 p-4 mb-4 border-dashed border-2 rounded-lg flex justify-between items-start shadow-sm list-none"
    >
      <div className="w-full">
        <h4 className="font-bold mb-2 text-foreground-700">
          {index + 1}. {question?.title}
        </h4>
        <p className="text-foreground-500 mb-4">{question?.description}</p>

        <div className="space-y-2 mt-2">
          {question?.answers?.map((answer: any, i: number) => (
            <motion.div
              key={i}
              className={cn(
                "flex items-center p-2 rounded-lg cursor-pointer",
                answer.isCorrect && showAnswers ? "bg-success-100" : "bg-white"
              )}
            >
              <span className="font-medium text-foreground-700">
                {String.fromCharCode(65 + i)}
              </span>
              <div className="border-l border-b-gray-700 h-6 mx-2" />
              <span className="text-foreground-700">{answer.content}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex space-x-2">
        <EditButton onClick={() => handleEditQuestion(index)} />
        <DeleteButton onClick={() => handleDeleteQuestion(index)} />
      </div>
    </motion.li>
  );
}

export default Question;
