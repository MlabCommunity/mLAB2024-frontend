"use client";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import NavbarContentContainer from "@/components/NavbarContentContainer";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuizData } from "@/utils/actions/quiz/updateQuizData";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { GeneratedQuestionsT } from "../types";

interface GeneralProps {
  title: string;
  description: string;
}

const General = ({ title, description }: GeneralProps) => {
  const queryClient = useQueryClient();
  const { quizId } = useParams();
  const t = useTranslations("QuestionsOnAnswers");

  const [isModified, setIsModified] = useState(false);
  const initialValues = { title, description };

  const generalSchema = z.object({
    title: z.string().min(1, { message: t("titleRequired") }),
    description: z.string().optional(),
  });

  type FormData = z.infer<typeof generalSchema>;
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      title,
      description,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const isFormChanged =
      watchedValues.title !== initialValues.title ||
      watchedValues.description !== initialValues.description;

    setIsModified(isFormChanged);
  }, [watchedValues, initialValues]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateQuizData,
    onSuccess: () => {
      toast.success(t("dataUpdated"));
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSettled: (data, error, variables) => {
      queryClient.setQueryData(
        ["singleQuiz"],
        (oldData: GeneratedQuestionsT) => {
          if (!oldData) return;

          return {
            ...oldData,
            title: variables.title,
            description: variables.description,
          };
        }
      );
    },
  });

  const onSubmit = (data: FormData) => {
    mutate({ title: data.title, description: data.description, id: quizId });
  };

  return (
    <NavbarContentContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-8 p-6 bg-content2 flex flex-col rounded-lg"
      >
        <div className="flex flex-col gap-4">
          <label className="text-md" htmlFor="QuizTitle">
            {t("generalSettingsHeading")}
          </label>
          <input
            id="QuizTitle"
            type="text"
            defaultValue={title}
            className="w-full px-3 py-2 rounded-lg outline-black"
            {...register("title")}
          />
          <span className="text-sm text-foreground-500 -mt-2">
            {t("generalSettingsHeadingTitle")}
          </span>
          {errors?.title && (
            <p className="text-red-500 text-sm">{errors?.title?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="QuizDescription">
            {t("quizDescriptionSettingsHeading")}
          </label>
          <input
            id="QuizDescription"
            type="text"
            defaultValue={description}
            className="w-full px-3 py-2 rounded-lg outline-black"
            {...register("description")}
          />
          <span className="text-sm text-foreground-500">
            {t("quizDescriptionSettingsTitle")}
          </span>
        </div>
        <Button
          className="flex self-end cursor-pointer disabled:bg-primary/50"
          variant="solid"
          color="primary"
          radius="sm"
          size="lg"
          type="submit"
          isDisabled={isPending || !isModified}
        >
          {t("save")}
        </Button>
      </form>
    </NavbarContentContainer>
  );
};

export default General;
