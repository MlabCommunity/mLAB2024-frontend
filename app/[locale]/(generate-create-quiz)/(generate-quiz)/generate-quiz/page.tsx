import React from "react";
import PromptForm from "./components/forms/PromptForm";
import { getTranslations } from "next-intl/server";
import InsertFileModal from "@/app/[locale]/modals/InsertFileModal";

const GenerateQuizPage = async () => {
  const t = await getTranslations("CreateQuiz");
  return (
    <>
      <div className="flex flex-col gap-6 p-3 md:w-[55rem] mx-auto ">
        <h2 className="text-4xl font-semibold">{t("createQuizHeading")}</h2>
        <p className="text-foreground-700">{t("createQuizMessage")}</p>
        <article className="rounded-lg">
          <PromptForm />
        </article>
      </div>
      <InsertFileModal />
    </>
  );
};

export default GenerateQuizPage;
