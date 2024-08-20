import React from "react";
import ButtonGroupComponent from "./ButtonsGroupComponent";
import { getTranslations } from "next-intl/server";
async function ConfigureQuiz() {
  const t = await getTranslations("ConfigureQuiz");
  return (
    <aside className="md:w-[55rem] mx-auto flex flex-col gap-6">
      <h1 className="text-4xl leading-10 font-semibold text-foreground-700">
        {t("configureQuizHeading")}
      </h1>
      <span className="text-foreground-700">{t("configureQuizMessage")}</span>
      <ButtonGroupComponent />
    </aside>
  );
}

export default ConfigureQuiz;
