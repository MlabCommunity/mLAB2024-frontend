"use client";
import React, { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteQuiz } from "@/utils/actions/quiz/deleteQuiz";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { Button } from "@nextui-org/react";
import { cn } from "@/lib";
import { updateQuizStatus } from "@/utils/api/updateQuizStatus";
import { motion } from "framer-motion";
import { DeleteButton } from "@/components/DeleteButton";
import { useTheme } from "@/app/context/ThemeContext";

interface QuizCardProps {
  title: string;
  id?: string;
  description: string;
  status: "Active" | "Inactive";
  questions: number;
  currentPage: number;
}

const QuizCard = ({
  title,
  id,
  description,
  status: initialStatus,
  questions,
  currentPage,
}: QuizCardProps) => {
  const { openModal, setModalData, closeModal } = useModalStore();
  const t = useTranslations("Dashboard");
  const queryClient = useQueryClient();
  const [currentStatus, setCurrentStatus] = useState<string>(initialStatus);
  const translatedCurrentStatus = t(currentStatus.toLocaleLowerCase());
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { theme } = useTheme(); 

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      toast.success(t("deletedQuizSuccess"));
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["quizList", currentPage],
      });
      setIsDeleting(false);
    },
  });

  const { mutate: updateStatusMutate, isPending: isPendingStatus } =
    useMutation({
      mutationFn: (data: { id: string; newStatus: "Active" | "Inactive" }) =>
        updateQuizStatus(data.id, data.newStatus),
      onSuccess: (data) => {
        setCurrentStatus(data.newStatus);
        toast.success(t("statusUpdateSuccess"));
        queryClient.setQueryData(["quizList", currentPage], (oldData: any) => {
          if (!oldData || !oldData.items) return oldData;
          return {
            ...oldData,
            items: oldData.items.map((quiz: any) =>
              quiz.id === id ? { ...quiz, status: data.newStatus } : quiz
            ),
          };
        });
      },
      onError: (error: any) => {
        toast.error(error.message || t("statusUpdateError"));
      },
    });

  const handleDeleteQuiz = async (id: string) => {
    if (!isDeleting) {
      setIsDeleting(true);
      deleteMutate(id);
    }
  };

  const handleOpenDeleteModal = (id?: string) => {
    if (!id) return;
    openModal("deleteQuizz");
    setModalData({
      title,
      description,
      status: currentStatus,
      questions,
      onConfirmDelete: () => {
        handleDeleteQuiz(id);
      },
      isPending: false,
    });
  };

  const handleStatusChange = async () => {
    if (!id) return;
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    setCurrentStatus(newStatus);
    updateStatusMutate({ id, newStatus });
  };

  const goQuizDetailsPage = () => {
    router.push(
      `${routes.quizDetails.pathname}${id}?currentPage=${currentPage}`
    );
  };

  return (
    <motion.div
      className={cn(
        "border-dashed border-2 p-3 md:justify-between flex flex-col shadow-md hover:shadow-lg transition-shadow relative w-full h-full sm:w-auto rounded-lg cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-[#f4f4f5] border-gray-300 text-black"
      )}
      onClick={goQuizDetailsPage}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-row justify-between items-start">
        <div>
          <h3 className="font-semibold text-base text-default-700">{title}</h3>
          <p className="text-base font-medium text-default-600 mt-1">
            {description}
          </p>
        </div>
        <DeleteButton onClick={() => handleOpenDeleteModal(id)} />
      </div>
      <div>
        <div className="flex items-center justify-start gap-4 mt-4">
          <div className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-lg">
            <p className="text-white text-small">
              {t("total")} {questions}
            </p>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange();
            }}
            disabled={isPendingStatus}
            className={cn(
              "px-2 py-1 rounded-lg text-small h-full flex items-center justify-center",
              currentStatus === "Active" ? "bg-success" : "bg-danger",
              isPendingStatus
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            )}
          >
            <p
              className={cn(
                currentStatus === "Active"
                  ? "text-foreground-600"
                  : "text-white"
              )}
            >
              {isPendingStatus
                ? t("updatingQuizStatus")
                : translatedCurrentStatus}
            </p>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard;
