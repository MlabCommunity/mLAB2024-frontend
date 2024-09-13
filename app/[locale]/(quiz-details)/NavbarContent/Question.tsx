import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import editIcon from "/public/assets/edit.svg";
import binIcon from "/public/assets/bin.svg";
import { QuestionsT } from "../types";
import { cn } from "@/lib";

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type Props = {
  questions: QuestionsT[];
  handleEditQuestion: (index: number) => void;
  handleDeleteQuestion: (index: number) => void;
  showAnswers: boolean;
};

function Question({
  questions,
  handleEditQuestion,
  handleDeleteQuestion,
  showAnswers,
}: Props) {
  const [visibleItems, setVisibleItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );
    const items = containerRef.current?.querySelectorAll("li");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect(); // Clean up observer on unmount
  }, []);

  return (
    <ul ref={containerRef}>
      {questions?.map((data, index) => (
        <motion.li
          key={index}
          data-index={index}
          initial="hidden"
          animate={visibleItems[index] ? "visible" : "hidden"}
          variants={listVariants}
          className="bg-default-100 p-4 mb-4 border-dashed border-2 rounded-lg flex justify-between items-start shadow-sm"
        >
          <div className="w-full">
            <h4 className="font-bold mb-2 text-foreground-700">
              {index + 1}. {data?.title}
            </h4>
            <p className="text-foreground-500 mb-4">{data?.description}</p>
            {/* Conditionally render answers based on showAnswers */}

            <div className="space-y-2 mt-2">
              {data?.answers?.map((answer: any, i: number) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center p-2 rounded-lg cursor-pointer",
                    answer.isCorrect && showAnswers
                      ? "bg-success-100"
                      : "bg-white"
                  )}
                >
                  <span className="font-medium text-foreground-700">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div className="border-l border-b-gray-700 h-6 mx-2" />
                  <span className="text-foreground-700">{answer.content}</span>
                </div>
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
      ))}
    </ul>
  );
}

export default Question;
