"use client";
import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { useDashboardStore } from "@/store/dashboardStore";
import { PaginatedResponse } from "@/types";
import { DashboardQuizItemT } from "@/app/[locale]/(dashboard)/types";

function BackToDashboard({
  quizId,
  newUrl,
}: {
  quizId: string;
  newUrl: string;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations("CreateQuizSuccess");
  const { updateQuizUrl } = useDashboardStore();
  const handleBackToDashboard = async () => {
    updateQuizUrl(quizId, newUrl);

    localStorage.removeItem("visitedRoutes");

    console.log("Navigating to dashboard...");
    router.push(routes.dashboard);
  };

  return (
    <Button variant="solid" color="primary" onClick={handleBackToDashboard}>
      {t("backToDashboardBtn")}
    </Button>
  );
}

export default BackToDashboard;
