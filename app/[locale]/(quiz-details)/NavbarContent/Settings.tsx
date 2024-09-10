"use client";

import React from "react";
import { Button, Checkbox, Switch } from "@nextui-org/react";
import NavbarContentContainer from "@/components/NavbarContentContainer";
import { useTranslations } from "next-intl";
import { useQuizDetailStore } from "@/store/quizDetailsStore";

function Settings() {
  const { setAvailability, setStatus, availability, status } =
    useQuizDetailStore();
  const handleCheckboxChange = (e: React.BaseSyntheticEvent) => {
    const { name } = e.target;
    setAvailability(name);
  };

  const t = useTranslations("QuestionsOnAnswers");
  return (
    <NavbarContentContainer className="bg-content2 p-6 flex flex-col gap-2 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-lg text-foreground-700">
            {t("quizStatusHeading")}
          </p>
          <p className="text-sm text-foreground-600">{t("quizStatus")}</p>
        </div>
        <Switch
          isSelected={status === "Active"}
          onChange={() => {
            setStatus(status === "Active" ? "Inactive" : "Active");
          }}
        />
      </div>
      <aside className="flex flex-col gap-2 mt-2">
        <span className="text-lg text-foreground-700">{t("availability")}</span>
        <div className="flex flex-col gap-2">
          <Checkbox
            color="primary"
            size="lg"
            radius="full"
            name="Public"
            isSelected={availability === "Public"}
            onChange={handleCheckboxChange}
          >
            <span className="text-foreground-500"> {t("public")}</span>
          </Checkbox>
          <Checkbox
            color="primary"
            size="lg"
            radius="full"
            name="Private"
            isSelected={availability === "Private"}
            onChange={handleCheckboxChange}
          >
            <span className="text-foreground-500"> {t("private")}</span>
          </Checkbox>
        </div>
        <Button
          className="flex self-end"
          variant="solid"
          color="primary"
          radius="sm"
          size="lg"
          type="submit"
        >
          {t("save")}
        </Button>
      </aside>
    </NavbarContentContainer>
  );
}

export default Settings;
