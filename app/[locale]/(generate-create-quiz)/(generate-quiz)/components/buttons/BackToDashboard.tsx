"use client";
import { routes } from "@/routes";
import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function BackToDashboard() {
  const queryClient = useQueryClient();
  const t = useTranslations("CreateQuizSuccess");
  return (
    <Button
      variant="solid"
      color="primary"
      onClick={() => {
        localStorage.removeItem("visitedRoutes");
        queryClient.invalidateQueries({ queryKey: ["quizList"] });
      }}
    >
      <Link href={routes.dashboard}>{t("backToDashboardBtn")}</Link>
    </Button>
  );
}

export default BackToDashboard;
