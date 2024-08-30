import React from "react";
import Preview from "./components/Preview";
import { useTranslations } from "next-intl";
const PreviewPage = () => {
  const t = useTranslations("QuizPreview");

  return (
    <section className="p-3">
      <h1 className="text-4xl font-semibold pt-5 pb-5">
        {t("quizPreviewHeading")}
      </h1>
      <h1
        className="text-lg
      font-normal text-foreground-600"
      >
        {t("quizPreviewMessage")}
      </h1>
      <Preview />
    </section>
  );
};

export default PreviewPage;
