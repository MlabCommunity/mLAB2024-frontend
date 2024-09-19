import { absoluteUrl } from "@/lib";
import { routes } from "@/routes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: routes.quizSuccess.title,
  alternates: {
    canonical: routes.quizSuccess.pathname,
  },
  openGraph: {
    title: routes.quizSuccess.title,
    url: absoluteUrl(routes.quizSuccess.pathname),
  },
};

const CreateQuizSuccess = ({ children }: { children: React.ReactNode }) => {
  return children
};

export default CreateQuizSuccess;
