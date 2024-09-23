"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TakeQuizBoxSkeleton from "./skeletons/TakeQuizBoxSkeleton";
import { getUserRoleFromJWT } from "@/utils/helpers";

interface TakeQuizBoxProps {
  setIsTakeQuizBoxVisible: (value: boolean) => void;
  quizTitle: string;
  quizDescription: string;
  quizLength: number;
}

const TakeQuizBox = ({
  setIsTakeQuizBoxVisible,
  quizDescription,
  quizTitle,
  quizLength,
}: TakeQuizBoxProps) => {
  const t = useTranslations("TakeQuiz");
  const userRole = getUserRoleFromJWT();

  const nameSchema =
    userRole === "Guest"
      ? z.string().optional()
      : z.string().min(2, { message: t("warningName") });

  const takeQuizSchema = z.object({
    name: nameSchema,
  });

  type FormData = z.infer<typeof takeQuizSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(takeQuizSchema),
  });

  function onSubmit() {
    setIsTakeQuizBoxVisible(false);
  }

  const isQuizDataLoaded = quizDescription && quizTitle;

  return (
    <div className="bg-default-100 p-6 py-10 rounded-xl flex flex-col items-start gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-foreground-700 text-4xl font-semibold ml-1">
          {t("takeQuiz")}
        </p>
        <span className="text-foreground-600">{t("quizSubHeading")}</span>
      </div>
      {userRole !== "Guest" && (
        <div className="flex flex-col w-full -mt-2">
          <label htmlFor="name" className="text-medium text-foreground-700">
            {t("name")}
          </label>
          <input
            id="name"
            type="text"
            placeholder={t("yourName")}
            autoComplete="off"
            className="text-foreground-500 mt-1 text-sm w-full rounded-lg p-3 outline-foreground-700 outline-1"
            {...register("name", { required: userRole !== "Guest" })}
          />
          {errors?.name && (
            <p className="text-red-500 mt-2 text-sm">{errors?.name?.message}</p>
          )}
        </div>
      )}

      {!isQuizDataLoaded ? (
        <TakeQuizBoxSkeleton />
      ) : (
        <div className="border-dashed border-2 border-gray-300 g-[#f4f4f5] p-6 md:justify-between flex flex-col gap-6 shadow-md hover:shadow-lg transition-shadow relative w-full h-auto rounded-lg">
          <div className="flex flex-row justify-between items-start">
            <div>
              <h3 className="font-semibold text-base text-default-700">
                {quizTitle}
              </h3>
              <p className="text-base font-medium text-default-600 mt-1">
                {quizDescription}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="flex items-center -mt-3 py-1 rounded-lg bg-primary/20 px-3">
              <p className="text-base-primary text-small">
                {t("total")} {quizLength} {t("questions")}
              </p>
            </div>
          </div>
          <Button
            variant="solid"
            className="bg-base-primary text-white"
            onClick={handleSubmit(onSubmit)}
          >
            {t("takeQuiz")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TakeQuizBox;
