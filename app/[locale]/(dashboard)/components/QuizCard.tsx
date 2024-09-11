import React, { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteQuiz } from "@/utils/actions/quiz/deleteQuiz";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { updateQuizStatus } from "@/utils/actions/quiz/updateQuizStatus";
import { cn } from "@/lib";
import Image from "next/image";

interface QuizCardProps {
  title: string;
  id?: string;
  description: string;
  status: string;
  questions: number;
}

const QuizCard = ({
  title,
  id,
  description,
  status: initialStatus,
  questions,
}: QuizCardProps) => {
  const { openModal, setModalData, closeModal } = useModalStore();
  const t = useTranslations("Dashboard");
  const queryClient = useQueryClient();
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
        queryKey: ["quizList"],
      });
      setIsDeleting(false);
    },
  });

  const handleDeleteQuiz = async (id: string) => {
    if (!isDeleting) {
      setIsDeleting(true);
      deleteMutate(id);
    }
  };

  const { mutate: updateStatusMutate } = useMutation({
    mutationFn: ({
      id,
      newStatus,
    }: {
      id: string;
      newStatus: "Active" | "Inactive";
    }) => updateQuizStatus(id!, newStatus),
    onSuccess: () => {
      toast.success(t("statusUpdateSuccess"));
    },
    onError: (error: any) => {
      toast.error(error.message || t("statusUpdateError"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["updateQuizStatus"],
      });
    },
  });

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
    setIsUpdating(true);
    try {
      updateStatusMutate({ id, newStatus });
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error(error);
      setCurrentStatus(newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const goQuizDetailsPage = () => {
    router.push(routes.quizDetails + id);
  };

  return (
    <div
      className="border-dashed border-2 border-gray-300 bg-[#f4f4f5] p-3 md:justify-between flex flex-col shadow-md hover:shadow-lg transition-shadow relative w-full sm:w-auto h-auto rounded-lg cursor-pointer"
      onClick={goQuizDetailsPage}
    >
      <div className="flex flex-row justify-between items-start">
        <div>
          <h3 className="font-semibold text-base text-default-700">{title}</h3>
          <p className="text-base font-medium text-default-600 mt-1">
            {description}
          </p>
        </div>
        <button
          className="ml-5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDeleteModal(id);
          }}
          disabled={isDeleting}
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
      <div>
        <div className="flex items-center justify-start gap-4 mt-4">
          <div className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-lg">
            <p className="text-white text-small">
              {t("total")} {questions} {t("questions")}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange();
            }}
            disabled={isUpdating}
            className={cn(
              "px-2 py-1 rounded-lg text-small h-full flex items-center justify-center",
              currentStatus === "Active" ? "bg-success" : "bg-danger",
              isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <p
              className={cn(
                currentStatus === "Active" ? "text-black" : "text-white"
              )}
            >
              {isUpdating ? t("updating") : currentStatus}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
