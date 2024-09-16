import { absoluteUrl } from "@/lib";
import { routes } from "@/routes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: routes.configureQuiz.title,
  alternates: {
    canonical: routes.configureQuiz.pathname,
  },
  openGraph: {
    title: routes.configureQuiz.title,
    url: absoluteUrl(routes.configureQuiz.pathname),
  },
};

const GenerateConfigureQuiz = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default GenerateConfigureQuiz;
