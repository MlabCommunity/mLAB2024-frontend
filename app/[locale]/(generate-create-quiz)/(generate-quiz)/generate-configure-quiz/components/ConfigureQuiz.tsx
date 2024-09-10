import React from "react";
import ButtonGroupComponent from "./ButtonsGroupComponent";
import { getTranslations } from "next-intl/server";
async function ConfigureQuiz() {
  const t = await getTranslations("ConfigureQuiz");
  return (
    <aside className="md:w-[55rem] mx-auto flex flex-col gap-6 p-3">
      <h2 className="text-4xl leading-10 font-semibold text-foreground-700">
        {t("configureQuizHeading")}
      </h2>
      <span className="text-foreground-700">{t("configureQuizMessage")}</span>
      <ButtonGroupComponent />
    </aside>
  );
}

export default ConfigureQuiz;
