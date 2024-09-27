"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { cn } from "@/lib";
import { registerParticipation } from "@/utils/actions/quiz/registerParticipation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { routes } from "@/routes";

const TakeQuizJoinPage = () => {
  const t = useTranslations("TakeQuiz");

  const quizUrlSchema = z.string().length(8, { message: t("charactersLong") });

  const router = useRouter();
  const [quizUrl, setQuizUrl] = useState("");
  const [error, setError] = useState("");

  const { mutate: registerParticipationMutate, isPending } = useMutation({
    mutationFn: registerParticipation,
    onError: (error) => toast.error(error.message),
    onSuccess: ({ id }) => {
      router.push(`${routes.takeQuiz.pathname}${id}`);
    },
    onMutate: () => toast.loading(t("joining"), { id: "loading-toast" }),
    onSettled: () => toast.dismiss("loading-toast"),
  });

  const handleJoinQuiz = () => {
    try {
      quizUrlSchema.parse(quizUrl);
      setError("");
      registerParticipationMutate({ urlId: quizUrl });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError(t("invalidQuizUrl"));
      }
    }
  };

  const isJoinDisabled = !quizUrl || isPending;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8 w-full max-w-7xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-2 light:text-black dark:text-white">{t("takeQuiz")}</h2>
      <p className="light:text-black dark:text-white mb-6">{t("toImprove")}</p>

      <Card className="p-2">
        <CardHeader>
          <h3 className="text-xl font-semibold">{t("join")}</h3>
        </CardHeader>
        <CardBody>
          <Input
            size="lg"
            placeholder={t("enterQuizUrl")}
            value={quizUrl}
            onChange={(e) => {
              setQuizUrl(e.target.value);
              setError("");
            }}
            className="w-full light:bg-content2-dark dark:bg-content2-light border-dashed border-2  rounded-lg "
          />
          {error && <p className="text-red-500 py-3">{error}</p>}
          <Button
            color="success"
            onClick={handleJoinQuiz}
            disabled={isJoinDisabled}
            className={cn(
              "w-full text-white cursor-pointer text-md",
              isJoinDisabled && "cursor-not-allowed disabled:bg-success/70",
              !error && "mt-4"
            )}
          >
            {t("join")}
          </Button>
        </CardBody>
      </Card>
    </motion.section>
  );
};

export default TakeQuizJoinPage;
