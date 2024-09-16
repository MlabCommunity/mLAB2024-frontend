import { absoluteUrl } from "@/lib";
import { routes } from "@/routes";
import { Button } from "@nextui-org/react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: routes.notFoundPage.title,
  alternates: {
    canonical: routes.notFoundPage.pathname,
  },
  openGraph: {
    title: routes.notFoundPage.title,
    url: absoluteUrl(routes.notFoundPage.pathname),
  },
};

const NotFoundPage = async () => {
  const t = await getTranslations("NotFoundPage");
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-9xl">404</p>
        <p className="text-2xl md:text-4xl text-primary-500">{t("notFound")}</p>
      </div>
      <Link href="/dashboard">
        <Button variant="solid" color="primary">
          {t("goDashboard")}
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
