import { routes } from "@/routes";
import { Button } from "@nextui-org/react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

async function BackToDashboard() {
  const t = await getTranslations("CreateQuizSuccess");
  return (
    <Button variant="solid" color="primary">
      <Link href={routes.dashboard}>{t("backToDashboardBtn")}</Link>
    </Button>
  );
}

export default BackToDashboard;
