import React, { useState, useCallback } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Container from "@/components/shared/Container";
import { Button } from "@nextui-org/react";
import { createGuestUser } from "@/utils/actions/user/createGuestUser";
import { registerParticipation } from "@/utils/actions/quiz/registerParticipation";
import { routes } from "@/routes";
import JoiningState from "./JoiningState";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Cookies from "js-cookie";

const GuestRegistration = () => {
  const t = useTranslations("Guest");
  const nameSchema = z
    .string()
    .min(2, { message: t("nameValidMin") })
    .max(50, { message: t("nameValidMax") });
  const router = useRouter();
  const { quizCode } = useParams();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const createGuestUserMutation = useMutation({
    mutationFn: createGuestUser,
    onError: () => {
      toast.error(t("registrationFailed"));
    },
  });

  const registerParticipationMutation = useMutation({
    mutationFn: registerParticipation,
    onSuccess: ({ id }) => {
      router.push(`${routes.takeQuiz.pathname}${id}`);
    },
    onError: () => {
      Cookies.remove("AccessToken");
      router.push(routes.signIn.pathname);
      toast.error(t("failedToJoin"));
    },
  });

  const handleJoinQuiz = useCallback(() => {
    try {
      nameSchema.parse(name);
      setError("");
      createGuestUserMutation.mutate(
        { displayName: name },
        {
          onSuccess: () => {
            if (typeof quizCode === "string") {
              registerParticipationMutation.mutate({ urlId: quizCode });
            } else {
              toast.error(t("invalidQuizCode"));
            }
          },
        }
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError(t("unexpectedError"));
      }
    }
  }, [name, createGuestUserMutation, registerParticipationMutation, quizCode]);

  const isLoading =
    createGuestUserMutation.isPending ||
    registerParticipationMutation.isPending;

  if (isLoading) {
    return <JoiningState />;
  }

  return (
    <Container className="h-screen flex items-center justify-center">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="-mt-10"
      >
        <div className="bg-default-100 p-8 rounded-xl flex flex-col items-start gap-10">
          <div className="flex flex-col">
            <p className="text-foreground-700 text-4xl font-semibold mb-2">
              {t("takeQuiz")}
            </p>
            <span>{t("dontHaveAnAccount")}</span>
          </div>
          <div className="flex flex-col w-full -mt-4">
            <label
              htmlFor="name"
              className="text-medium text-foreground-700 mb-1"
            >
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              autoComplete="off"
              className="text-foreground-500 text-sm w-full rounded-lg p-3 outline-foreground-700 outline-1"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder={t("enterName")}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <Button
            variant="solid"
            className="bg-base-primary text-white w-full disabled:bg-primary/50"
            onClick={handleJoinQuiz}
            disabled={isLoading}
          >
            {isLoading ? t("joining") : t("joinQuiz")}
          </Button>
        </div>
      </motion.section>
    </Container>
  );
};

export default GuestRegistration;
