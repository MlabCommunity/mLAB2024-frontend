"use client";

import { cn } from "@/lib";
import Image from "next/image";
import React from "react";
import { useModalStore } from "@/store/modalStore";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { deleteQuizz } from "@/utils/actions/quiz/deleteQuiz";
import toast from "react-hot-toast";
import axios from "axios";
import { DeleteQuiz } from "@/constants/api";

interface QuizCardProps {
  title: string;
  id?: string; // Ensure id is optional, but ideally it should be required
  description: string;
  status: string;
  questions: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  id,
  description,
  status,
  questions,
}) => {
  const { openModal, setModalData, closeModal, type } = useModalStore();
  const t = useTranslations("Dashboard");

  const { mutate } = useMutation({
    mutationFn: deleteQuizz,
    onSuccess: () => {
      toast.success(t("deletedQuizSuccess"));
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  // Function to handle quiz deletion
  const handleDeleteQuiz = async (id: string) => {
    console.log(id);
    mutate(id);
  };

  // Function to open the delete modal with the necessary data
  const handleOpenDeleteModal = (id?: string) => {
    if (!id) return; // Ensure the id is available
    openModal("deleteQuizz");
    setModalData({
      title,
      description,
      status,
      questions,
      onConfirmDelete: () => {
        handleDeleteQuiz(id);
      },
    });
  };

  return (
    <div className="border-dashed border-2 border-gray-300 bg-[#f4f4f5] p-3 md:justify-between flex flex-col shadow-md hover:shadow-lg transition-shadow relative w-full sm:w-auto h-auto rounded-lg">
      <div className="flex flex-row justify-between items-start">
        <div>
          <h3 className="font-semibold text-base text-default-700">{title}</h3>
          <p className="text-base font-medium text-default-600 mt-1">
            {description}
          </p>
        </div>
        <button
          className="ml-5 cursor-pointer"
          onClick={() => handleOpenDeleteModal(id)} // Pass the id here
        >
          <Image
            src="/assets/bin.svg"
            width={20}
            height={20}
            className="min-w-5 min-h-5 md:min-h-6 md:min-w-6"
            alt="bin icon"
          />
        </button>
      </div>
      <div className="flex items-center justify-start gap-4 mt-4">
        <div className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-lg">
          <p className="text-white text-small">
            {t("total")} {questions} {t("questions")}
          </p>
        </div>
        <div
          className={cn(
            "px-2 py-1 rounded-lg text-small h-full flex items-center justify-center",
            status === "Active" ? "bg-success" : "bg-danger"
          )}
        >
          <p className={cn(status === "Active" ? "text-black" : "text-white")}>
            {status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
