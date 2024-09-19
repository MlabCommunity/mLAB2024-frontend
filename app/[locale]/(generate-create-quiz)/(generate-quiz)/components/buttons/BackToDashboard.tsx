"use client";
import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";

function BackToDashboard({
  quizId,
  newUrl,
}: {
  quizId: string;
  newUrl: string;
}) {
  const router = useRouter();
  const t = useTranslations("CreateQuizSuccess");
  const handleBackToDashboard = async () => {
    localStorage.removeItem("visitedRoutes");
    router.push(routes.dashboard.pathname);
  };

  return (
    <Button variant="solid" color="primary" onClick={handleBackToDashboard}>
      {t("backToDashboardBtn")}
    </Button>
  );
}

export default BackToDashboard;
