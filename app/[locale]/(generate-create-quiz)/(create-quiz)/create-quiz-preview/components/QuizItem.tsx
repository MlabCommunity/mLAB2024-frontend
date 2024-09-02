"use client";
import Image from "next/image";
import React from "react";
import thrash from "/public/assets/trash.svg";
import edit from "/public/assets/edit-2.svg";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import { cn } from "@/lib";

type QuizItemProps = {
  questionId: number;
  question: string;
  number: number;
  options: { content: string; isCorrect: boolean }[];
  showCorrectAnswers?: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
};

const QuizItem = ({
  questionId,
  question,
  options,
  number,
  handleDelete,
  handleEdit,
  showCorrectAnswers,
}: QuizItemProps) => {
  const labels = ["A", "B", "C", "D"];
  return (
    <div data-question-id={questionId} className="relative flex flex-col gap-4">
      <div className="flex flex-col gap-4 pt-4 border-[1.5px] border-dashed rounded-lg pb-4 pl-6 pr-6">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-[16px] leading-6 ">
            {`${number}.`}
            {question}
          </h2>
          <div className="flex p-2">
            <Button variant="light" size="sm">
              <Image onClick={handleDelete} src={thrash} alt="delete" />
            </Button>
            <Button variant="light" size="sm">
              <Image onClick={handleEdit} src={edit} alt="edit" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {options.map((option, index) => (
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
              <Divider orientation="vertical" className="w-[1px] ml-2 mr-2" />
              {option.content}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
