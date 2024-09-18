"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { cn } from "@/lib";
import { getIdFromUrl } from "@/utils/helpers";
import { registerParticipation } from "@/utils/actions/quiz/registerParticipation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const TakeQuizJoinPage = () => {
  const router = useRouter();
  const t = useTranslations("TakeQuiz");
  const [quizUrl, setQuizUrl] = useState("");
  const [quizCode, setQuizCode] = useState("");

  const { mutate: registerParticipationMutate, isPending } = useMutation({
    mutationFn: registerParticipation,
    onError: (error) => toast.error(error.message),
    onSuccess: ({ id }) => {
      toast.success(t("codeGeneratedSuccessfully"));
      setQuizCode(id);
    },
    onMutate: () =>
      toast.loading(t("generatingQuizCode"), { id: "loading-toast" }),
    onSettled: () => toast.dismiss("loading-toast"),
  });

  const handleGenerateCode = () => {
    const urlId = getIdFromUrl(quizUrl);
    if (urlId) {
      registerParticipationMutate({ urlId });
    } else {
      toast.error(t("enterQuizUrl"));
    }
  };

  const handleJoinQuiz = () => {
    if (quizCode) {
      toast.success(`${t("joiningQuiz")} ${quizCode}`);
      router.push(`/take-quiz/${quizCode}`);
    } else {
      toast.error(t("generateCodeFirst"));
    }
  };

  const isGenerateDisabled = isPending || !quizUrl;
  const isJoinDisabled = !quizCode || isPending;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8 w-full max-w-7xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-2 text-black">{t("takeQuiz")}</h2>
      <p className="text-gray-600 mb-6">{t("toImprove")}</p>

      <Card className="mb-6 p-2">
        <CardHeader>
          <h3 className="text-xl font-semibold">{t("generateCode")}</h3>
        </CardHeader>
        <CardBody>
          <Input
            label="Quiz URL"
            placeholder={t("enterQuizUrl")}
            value={quizUrl}
            onChange={(e) => setQuizUrl(e.target.value)}
            className="mb-4"
          />
          <Button
            color="primary"
            className={cn(
              "cursor-pointer text-md",
              isGenerateDisabled && "cursor-not-allowed disabled:bg-primary/70"
            )}
            onClick={handleGenerateCode}
            disabled={isGenerateDisabled}
          >
            {t("generateCode2")}
          </Button>
        </CardBody>
      </Card>

      <Card className="p-2">
        <CardHeader>
          <h3 className="text-xl font-semibold">{t("join")}</h3>
        </CardHeader>
        <CardBody>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 border-dashed border-2 border-gray-300">
            <p className="text-xl text-center">
              {quizCode || t("willApearHere")}
            </p>
          </div>
          <Button
            color="success"
            onClick={handleJoinQuiz}
            disabled={isJoinDisabled}
            className={cn(
              "w-full text-white cursor-pointer text-md",
              isJoinDisabled && "cursor-not-allowed disabled:bg-success/70"
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
