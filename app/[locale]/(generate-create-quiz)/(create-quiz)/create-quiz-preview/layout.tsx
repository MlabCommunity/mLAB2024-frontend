import { absoluteUrl } from "@/lib";
import { routes } from "@/routes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: routes.quizPreview.title,
  alternates: {
    canonical: routes.quizPreview.pathname,
  },
  openGraph: {
    title: routes.quizPreview.title,
    url: absoluteUrl(routes.quizPreview.pathname),
  },
};

const CreateQuizPreview = ({ children }: { children: React.ReactNode }) => {
  return children ;
};

export default CreateQuizPreview;
