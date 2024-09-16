"use client";
import React, { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import TickCircle from "@/app/[locale]/(generate-create-quiz)/(generate-quiz)/components/TickCircle";
import EmptyCircle from "@/app/[locale]/(generate-create-quiz)/(generate-quiz)/components/EmptyCircle";
import NextButton from "@/app/[locale]/(generate-create-quiz)/(generate-quiz)/components/buttons/NextButton";
import NavigationControls from "@/app/[locale]/(generate-create-quiz)/(generate-quiz)/components/buttons/NavigationControls";

function ButtonGroupComponent() {
  const [selectedType, setSelectedType] = useState("multiple-choice");
  const [selectedQuantity, setSelectedQuantity] = useState("medium");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const t = useTranslations("ConfigureQuiz");

  // Handle clicks for the type of questions
  const handleTypeClick = (type: string) => {
    if (!isPending) setSelectedType(type);
  };

  // Handle clicks for the number of questions
  const handleQuantityClick = (qty: string) => {
    if (!isPending) setSelectedQuantity(qty);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPending) {
      setIsPending(true);
      try {
        router.push(routes.createQuiz[2].route);
      } catch (error) {
        console.error("Błąd:", error);
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-full rounded-lg flex flex-col"
    >
      <div className="flex flex-col bg-content2 gap-4 p-6">
        <span>{t("questionsType")}</span>
        <div className="w-full flex">
          <ButtonGroup
            className="flex flex-col md:flex-row justify-start gap-2 md:gap-0 items-start w-full"
            variant="solid"
            color="primary"
            radius="md"
            size="md"
          >
            <Button
              variant={selectedType === "multiple-choice" ? "solid" : "flat"}
              className={`w-full md:w-auto justify-start ${
                selectedType === "multiple-choice" ? "text-white" : ""
              }`}
              size="lg"
              startContent={
                selectedType === "multiple-choice" ? (
                  <TickCircle />
                ) : (
                  <EmptyCircle />
                )
              }
              name="multiple-choice"
              aria-pressed={selectedType === "multiple-choice"}
              onClick={() => handleTypeClick("multiple-choice")}
              disabled={isPending}
            >
              <span>{t("multipleChoice")}</span>
            </Button>
            <Button
              variant={selectedType === "true-false" ? "solid" : "flat"}
              className="w-full justify-start md:w-auto"
              size="lg"
              startContent={
                selectedType === "true-false" ? <TickCircle /> : <EmptyCircle />
              }
              name="true-false"
              aria-pressed={selectedType === "true-false"}
              onClick={() => handleTypeClick("true-false")}
              disabled={isPending}
            >
              <span>{t("trueFalse")}</span>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div>
        <div className="gap-4 p-6 flex flex-col bg-content2">
          <span>{t("howManyQuestions")}</span>
          <ButtonGroup
            className="flex-col w-full gap-2 md:gap-0 items-start flex md:flex-row justify-start"
            variant="solid"
            color="primary"
            radius="md"
            size="md"
          >
            <Button
              variant={selectedQuantity === "low" ? "solid" : "flat"}
              className="w-full justify-start md:w-auto"
              size="lg"
              startContent={
                selectedQuantity === "low" ? <TickCircle /> : <EmptyCircle />
              }
              name="low"
              aria-pressed={selectedQuantity === "low"}
              onClick={() => handleQuantityClick("low")}
              disabled={isPending}
            >
              <span>{t("low")}</span>
            </Button>
            <Button
              variant={selectedQuantity === "medium" ? "solid" : "flat"}
              className={`w-full md:w-auto justify-start ${
                selectedQuantity === "medium" ? "text-white" : ""
              }`}
              size="lg"
              startContent={
                selectedQuantity === "medium" ? <TickCircle /> : <EmptyCircle />
              }
              name="medium"
              aria-pressed={selectedQuantity === "medium"}
              onClick={() => handleQuantityClick("medium")}
              disabled={isPending}
            >
              <span>{t("med")}</span>
            </Button>
            <Button
              variant={selectedQuantity === "high" ? "solid" : "flat"}
              className="w-full justify-start md:w-auto"
              size="lg"
              startContent={
                selectedQuantity === "high" ? <TickCircle /> : <EmptyCircle />
              }
              name="high"
              aria-pressed={selectedQuantity === "high"}
              onClick={() => handleQuantityClick("high")}
              disabled={isPending}
            >
              <span>{t("high")}</span>
            </Button>
            <Button
              variant={selectedQuantity === "manual" ? "solid" : "flat"}
              className="w-full justify-start md:w-auto"
              size="lg"
              startContent={
                selectedQuantity === "manual" ? <TickCircle /> : <EmptyCircle />
              }
              name="manual"
              aria-pressed={selectedQuantity === "manual"}
              onClick={() => handleQuantityClick("manual")}
              disabled={isPending}
            >
              <span>{t("man")}</span>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <NavigationControls>
        <NextButton isPending={isPending} />
      </NavigationControls>
    </form>
  );
}

export default ButtonGroupComponent;
