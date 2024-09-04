"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import NavbarContentContainer from "@/components/NavbarContentContainer";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface GeneralProps {
  title: string;
  description: string;
}

const General = ({ title, description }: GeneralProps) => {
  const t = useTranslations("QuestionsOnAnswers");
  const generalSchema = z.object({
    title: z.string().min(1, { message: t("titleRequired") }),
    description: z.string().optional(),
  });

  type FormData = z.infer<typeof generalSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      title,
      description,
    },
  });

  const onSubmit = () => {};

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
          className="flex self-end cursor-pointer"
          variant="solid"
          color="primary"
          radius="sm"
          size="lg"
          type="submit"
        >
          {t("save")}
        </Button>
      </form>
    </NavbarContentContainer>
  );
};

export default General;
