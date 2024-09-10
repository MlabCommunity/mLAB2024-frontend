import React, { Suspense } from "react";
import Preview from "./components/Preview";
import { useTranslations } from "next-intl";
import PreviewSkeleton from "./components/skeletons/PreviewSkeleton";
const PreviewPage = () => {
  const t = useTranslations("QuizPreview");

  return (
    <section className="p-3">
      <h2 className="text-4xl font-semibold pt-5 pb-2">
        {t("quizPreviewHeading")}
      </h2>
      <p
        className="text-lg
      font-normal text-foreground-600"
      >
        {t("quizPreviewMessage")}
      </p>
      <Suspense fallback={<PreviewSkeleton />}>
        <Preview />
      </Suspense>
    </section>
  );
};

export default PreviewPage;
