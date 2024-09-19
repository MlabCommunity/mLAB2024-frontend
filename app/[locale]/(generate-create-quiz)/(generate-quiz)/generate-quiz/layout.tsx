import { absoluteUrl } from "@/lib";
import { routes } from "@/routes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: routes.generateQuiz.title,
  alternates: {
    canonical: routes.generateQuiz.pathname,
  },
  openGraph: {
    title: routes.generateQuiz.title,
    url: absoluteUrl(routes.generateQuiz.pathname),
  },
};

const GenerateQuizLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default GenerateQuizLayout;
