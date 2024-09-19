import { absoluteUrl } from "@/lib";
import { routes } from "@/routes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: routes.takeQuiz.title,
  alternates: {
    canonical: routes.takeQuiz.pathname,
  },
  openGraph: {
    title: routes.takeQuiz.title,
    url: absoluteUrl(routes.takeQuiz.pathname),
  },
};

const TakeQuizLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default TakeQuizLayout;
