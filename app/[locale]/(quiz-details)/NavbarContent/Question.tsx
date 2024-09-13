import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import editIcon from "/public/assets/edit.svg";
import binIcon from "/public/assets/bin.svg";
import { QuestionsT } from "../types";
import { cn } from "@/lib"; // Import your utility for class names
import { useInView } from "react-intersection-observer";

// Define animation variants for the list items
const listVariants = {
  hidden: { opacity: 0, y: 20 }, // Start hidden and slightly lower
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Fade in and move to position
};

type Props = {
  questions: QuestionsT[];
  handleEditQuestion: (index: number) => void; // Add type for edit handler
  handleDeleteQuestion: (index: number) => void; // Add type for delete handler
};

function Question({
  questions,
  handleEditQuestion,
  handleDeleteQuestion,
}: Props) {
  return (
    <ul>
      {questions?.map((data, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [ref, inView] = useInView(); // Create a new ref for each item
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const controls = useAnimation();

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (inView) {
            controls.start("visible");
          } else {
            controls.start("hidden"); // Optional: Hide when out of view
          }
        }, [controls, inView]);

        return (
          <motion.li
            ref={ref}
            key={index}
            initial="hidden"
            animate={controls}
            variants={listVariants}
            className="bg-default-100 p-4 mb-4 border-dashed border-2 rounded-lg flex justify-between items-start shadow-sm"
          >
            <div className="w-full">
              <h4 className="font-bold mb-2 text-foreground-700">
                {index + 1}. {data?.title}
              </h4>
              <p className="text-foreground-500 mb-4">{data?.description}</p>
              <div className="space-y-2 mt-2">
                {data?.answers?.map((answer: any, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center p-2 rounded-lg cursor-pointer",
                      answer.isCorrect ? "bg-success-100" : "bg-white"
                    )}
                  >
                    <span className="font-medium text-foreground-700">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <div className="border-l border-b-gray-700 h-6 mx-2" />
                    <span className="text-foreground-700">
                      {answer.content}
                    </span>
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
        );
      })}
    </ul>
  );
}

export default Question;
