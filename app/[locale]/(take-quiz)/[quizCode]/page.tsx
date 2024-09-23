"use client";

import React, { useEffect, useState } from "react";
import animationData from "@/public/lotties/TakeQuizLoading.json";
import Lottie from "react-lottie";
import { useMutation } from "@tanstack/react-query";
import { registerParticipation } from "@/utils/actions/quiz/registerParticipation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";

const TakeQuizPage = ({ params }: { params: { quizCode: string } }) => {
  const t = useTranslations("TakeQuiz");
  const router = useRouter();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  const [isToastShown, setIsToastShown] = useState(false);

  const { mutate: registerParticipationMutate } = useMutation({
    mutationFn: registerParticipation,
    onError: () => {
      router.push(routes.dashboard.pathname);
      if (!isToastShown) {
        toast.error(t("wasInvalid"));
      }
    },
    onSuccess: ({ id }) => {
      router.push(`${routes.takeQuiz.pathname}${id}`);
    },
  });

  useEffect(() => {
    setIsToastShown(true);
    registerParticipationMutate({ urlId: params.quizCode });
  }, [params.quizCode, registerParticipationMutate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-10">
      <div className="flex flex-col items-center -mt-40">
        <Lottie options={defaultOptions} height={400} width={400} />
        <p className="text-5xl sm:text-7xl font-semibold animate-bounce -mt-10 text-primary">
          {t("joining")}
        </p>
      </div>
    </div>
  );
};

export default TakeQuizPage;
