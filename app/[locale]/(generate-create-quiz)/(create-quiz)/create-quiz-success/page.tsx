import React from "react";
import BackToDashboard from "../../(generate-quiz)/generate-quiz/components/buttons/BackToDashboard";
import { getTranslations } from "next-intl/server";
const page = async () => {
  const t = await getTranslations("CreateQuizSuccess");
  return (
    <main className="p-3 flex flex-col gap-6">
      <h1 className="text-4xl font-semibold">{t("quizSuccessHeading")}</h1>
      <p className="text-foreground-600 text-lg">{t("quizSuccessMessage")}</p>
      <div className="bg-content2 p-6 gap-6 flex flex-col">
        <div className=" flex items-center h-[52px] bg-white p-3  gap-3 justify-center">
          <span className="text-lg">link.com/unique-id123</span>
          {/* <Image src={documentIcon} alt="Document Icon" /> */}
        </div>
      </div>
      <div className="flex items-center justify-end">
        <BackToDashboard />
      </div>
    </main>
  );
};

export default page;
