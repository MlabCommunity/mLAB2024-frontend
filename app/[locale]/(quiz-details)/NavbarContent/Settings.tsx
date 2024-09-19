"use client";

import React from "react";
import { Button, Checkbox, Switch } from "@nextui-org/react";
import NavbarContentContainer from "@/components/NavbarContentContainer";
import { useTranslations } from "next-intl";
import { useQuizDetailStore } from "@/store/quizDetailsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateQuizStatus } from "@/utils/actions/quiz/updateQuizStatus";
import { updateAvailability } from "@/utils/actions/quiz/updateAvailability";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface SettingsProps {
  quizId: string;
}

function Settings({ quizId }: SettingsProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentPage = Number(params.get("currentPage"));

  console.log(currentPage);

  const queryClient = useQueryClient();
  const t = useTranslations("quizDetails");
  const { mutate: updateAvailabilityMutate } = useMutation({
    mutationFn: ({
      id,
      newAvailability,
    }: {
      id: string;
      newAvailability: "Public" | "Private";
    }) => updateAvailability(id!, newAvailability),
    onSuccess: () => {
      toast.success(t("availabilityUpdateSuccess"));
    },
    onError: (error: any) => {
      toast.error(error.message || t("availabilityUpdateError"));
    },
  });
  const { mutate: updateStatusMutate } = useMutation({
    mutationFn: ({
      id,
      newStatus,
    }: {
      id: string;
      newStatus: "Active" | "Inactive";
    }) => updateQuizStatus(id!, newStatus),
    onSuccess: (data) => {
      toast.success(t("statusUpdateSuccess"));
      queryClient.setQueryData(["quizList", currentPage], (oldData: any) => {
        console.log(oldData);
        if (!oldData || !oldData.items) return oldData;
        return {
          ...oldData,
          items: oldData.items.map((quiz: any) =>
            quiz.id === quizId ? { ...quiz, status: data.newStatus } : quiz
          ),
        };
      });
    },
    onError: (error: any) => {
      toast.error(error.message || t("statusUpdateError"));
    },
  });

  console.log(params);

  const { setAvailability, setStatus, availability, status } =
    useQuizDetailStore();

  const handleCheckboxChange = (e: React.BaseSyntheticEvent) => {
    const { name } = e.target;
    setAvailability(name);
  };

  const handleStatusChange = () => {
    updateStatusMutate({
      id: quizId,
      newStatus: status as "Active" | "Inactive",
    });
  };

  const handleAvailablityChange = () => {
    updateAvailabilityMutate({
      newAvailability: availability as "Public" | "Private",
      id: quizId,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <NavbarContentContainer className="bg-content2 p-6 flex flex-col gap-2 rounded-lg">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-lg text-foreground-700">
                {t("quizStatusHeading")}
              </p>
              <p className="text-sm text-foreground-600 pr-2">
                {t("quizStatus")}
              </p>
            </div>
            <Switch
              isSelected={status === "Active"}
              onChange={() => {
                setStatus(status === "Active" ? "Inactive" : "Active");
              }}
            />
          </div>
          <Button
            className="flex self-end ml-auto mt-8 disabled:bg-primary/50"
            variant="solid"
            color="primary"
            radius="sm"
            size="lg"
            type="submit"
            onClick={handleStatusChange}
          >
            {t("save")}
          </Button>
        </div>
        <aside className="flex flex-col gap-2 mt-2">
          <span className="text-lg text-foreground-700">
            {t("availability")}
          </span>
          <div className="flex flex-col gap-2">
            <Checkbox
              color="primary"
              size="lg"
              radius="full"
              name="Public"
              isSelected={availability === "Public"}
              onChange={handleCheckboxChange}
            >
              <span className="text-foreground-500"> {t("public")}</span>
            </Checkbox>
            <Checkbox
              color="primary"
              size="lg"
              radius="full"
              name="Private"
              isSelected={availability === "Private"}
              onChange={handleCheckboxChange}
            >
              <span className="text-foreground-500"> {t("private")}</span>
            </Checkbox>
          </div>
          <Button
            className="flex self-end disabled:bg-primary/50"
            variant="solid"
            color="primary"
            radius="sm"
            size="lg"
            type="submit"
            onClick={handleAvailablityChange}
          >
            {t("save")}
          </Button>
        </aside>
      </NavbarContentContainer>
    </motion.div>
  );
}

export default Settings;
