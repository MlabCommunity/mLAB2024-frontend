"use client";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NavigationControls from "../buttons/NavigationControls";
import NextButton from "../buttons/NextButton";
import { useTranslations } from "use-intl";
import { useGenerateQuizStore } from "@/store/generateQuizStore";

const PromptForm = () => {
  const { setGenerateQuizData } = useGenerateQuizStore();
  const t = useTranslations("CreateQuiz");

  const promptSchema = z.object({
    prompt: z.string().min(10, { message: t("promptRequiredField") }),
  });
  type FormValue = z.infer<typeof promptSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ resolver: zodResolver(promptSchema) });
  const router = useRouter();

  const onSubmit = (data: FormValue) => {
    router.push(routes.createQuiz[1].route);
    setGenerateQuizData({
      content: data.prompt,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        isRequired
        variant="faded"
        label={t("contentLabel")}
        {...register("prompt", { required: true })}
        labelPlacement="outside"
        placeholder={t("promptForm")}
        className="p-6 gap-2 bg-content2 rounded-lg"
      />
      {errors.prompt && (
        <div className="text-red-500 text-sm mt-2">{errors.prompt.message}</div>
      )}
      <NavigationControls>
        <NextButton />
      </NavigationControls>
    </form>
  );
};

export default PromptForm;
