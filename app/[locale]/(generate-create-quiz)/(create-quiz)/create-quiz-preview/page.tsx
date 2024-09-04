import React from "react";
import Preview from "./components/Preview";
import { useTranslations } from "next-intl";
const PreviewPage = () => {
  const t = useTranslations("QuizPreview");

  return (
    <section className="p-3">
      <h2 className="text-4xl font-semibold pt-5 pb-5">
        {t("quizPreviewHeading")}
      </h2>
      <p
        className="text-lg
      font-normal text-foreground-600"
      >
        {t("quizPreviewMessage")}
      </p>
      <Preview />
    </section>
  );
};

export default PreviewPage;