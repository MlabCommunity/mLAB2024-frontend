"use client";

import React from "react";
import { Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import NavigationControls from "@/generate-quiz-components/NavigationControls";
import NextButton from "@/generate-quiz-components/NextButton";
import InsertFileButton from "../buttons/InsertFileButton";
import { motion } from "framer-motion";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { routes } from "@/routes";
import { useStepperStore } from "@/store/stepperStore";

const PromptForm = () => {
  const { setGenerateQuizData, generateQuizData } = useGenerateQuizStore();
  const t = useTranslations("CreateQuiz");
  const router = useRouter();
  const { setCurrentRoute, addVisitedRoute } = useStepperStore();
  const promptSchema = z.object({
    prompt: z
      .string()
      .refine(
        (val) =>
          generateQuizData.Attachments!.length > 0 || val.trim().length > 0,
        { message: t("requiredFields") }
      ),
  });

  type FormValue = z.infer<typeof promptSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ resolver: zodResolver(promptSchema) });

  const onSubmit = (data: FormValue) => {
    setCurrentRoute(routes.configureQuiz.pathname);
    addVisitedRoute(routes.generateQuiz.pathname); //
    router.push(routes.configureQuiz.pathname);

    setGenerateQuizData({
      ...generateQuizData,
      Content: data.prompt,
    });
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-red-500 text-sm mt-2">
              {errors.prompt.message}
            </div>
          </motion.div>
        )}
        <NavigationControls>
          <NextButton />
          <InsertFileButton />
        </NavigationControls>
      </form>
    </div>
  );
};

export default PromptForm;
