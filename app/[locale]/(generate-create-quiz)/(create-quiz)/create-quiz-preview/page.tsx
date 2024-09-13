"use client";

import React, { Suspense } from "react";
import Preview from "./components/Preview";
import { useTranslations } from "next-intl";
import PreviewSkeleton from "./components/skeletons/PreviewSkeleton";
import { motion, useScroll } from "framer-motion";

const PreviewPage = () => {
  const { scrollYProgress } = useScroll();
  const t = useTranslations("QuizPreview");

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left"
      />

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
    </>
  );
};

export default PreviewPage;
