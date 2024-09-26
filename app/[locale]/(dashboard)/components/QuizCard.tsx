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
      className="border-dashed border-2 border-gray-300 bg-[#f4f4f5] p-3 md:justify-between flex flex-col shadow-md hover:shadow-lg transition-shadow relative w-full h-full sm:w-auto rounded-lg cursor-pointer"
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
        <button
          className="hover:scale-110 text-[#71717A] hover:text-danger transition-all w-[22px]"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDeleteModal(id);
          }}
          disabled={isDeleting}
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
