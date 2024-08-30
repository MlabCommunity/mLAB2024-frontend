"use client";
import Image from "next/image";
import React from "react";
import thrash from "/public/assets/trash.svg";
import edit from "/public/assets/edit-2.svg";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";

type QuizItemPropType = {
  questionId: number;
  question: string;
  number: number;
  options: { content: string; isCorrect: boolean }[]; // Updated type
  description: string;
  showCorrectAnswers?: boolean; // New prop for showing correct answers
  handleDelete: () => void;
  handleEdit: () => void;
};

const QuizItem = ({
  questionId,
  question,
  options,
  number,
  description,
  handleDelete,
  handleEdit,
  showCorrectAnswers,
}: QuizItemPropType) => {
  const labels = ["A", "B", "C", "D"];

  return (
    <div data-question-id={questionId} className="relative flex flex-col gap-4">
      <div
        className={`flex flex-col gap-4 pt-4 border-[1.5px] border-dashed rounded-lg pb-4 pl-6 pr-6`}
      >
        <div className="flex justify-between items-start">
          <h1 className="font-bold text-[16px] leading-6 ">
            {`${number}. `}
            {question}
          </h1>
          <div className="flex p-2 gap-2">
            <Image
              onClick={handleDelete}
              src={thrash}
              alt="delete"
              className="cursor-pointer"
            />
            <Image
              onClick={handleEdit}
              src={edit}
              alt="edit"
              className="cursor-pointer"
            />
          </div>
        </div>
        <span>{description}</span>
        <div className="flex flex-col gap-2">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="flat"
              color="default"
              className="justify-start items-center flex"
              style={{
                backgroundColor:
                  showCorrectAnswers && option.isCorrect
                    ? "#D1FAE5" // Light green background for correct answer
                    : "",
                color:
                  showCorrectAnswers && option.isCorrect
                    ? "#065F46" // Dark green text color for correct answer
                    : "",
              }}
            >
              {`${labels[index]}`}
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
