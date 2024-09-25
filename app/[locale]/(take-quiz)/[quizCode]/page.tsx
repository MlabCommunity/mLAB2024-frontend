"use client";

import React, { useEffect, useState } from "react";
import animationData from "@/public/lotties/TakeQuizLoading.json";
import { useMutation } from "@tanstack/react-query";
import { registerParticipation } from "@/utils/actions/quiz/registerParticipation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import GuestRegistration from "./components/GuestRegistration";
import JoiningState from "./components/JoiningState";

const TakeQuizPage = ({ params }: { params: { quizCode: string } }) => {
  const accessToken = Cookies.get("AccessToken");
  const t = useTranslations("TakeQuiz");
  const router = useRouter();

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
    if (accessToken) {
      setIsToastShown(true);
      registerParticipationMutate({ urlId: params.quizCode });
    }
  }, [params.quizCode, registerParticipationMutate]);

  if (accessToken) {
    return <JoiningState />;
  }

  if (!accessToken) {
    return <GuestRegistration />;
  }
};

export default TakeQuizPage;
