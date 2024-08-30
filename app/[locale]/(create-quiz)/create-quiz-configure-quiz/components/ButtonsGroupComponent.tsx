"use client";
import React, { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import TickCircle from "./TickCircle";
import EmptyCircle from "./EmptyCircle";
import NextButton from "../../create-quiz/components/buttons/NextButton";
import { useRouter } from "next/navigation";
import NavigationControls from "../../create-quiz/components/buttons/NavigationControls";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { QuestionType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { generateQuiz } from "@/utils/actions/quiz/generateQuiz";
function ButtonGroupComponent() {
  const { generateQuizData, setGeneratedQuizData } = useGenerateQuizStore();
  const { content } = generateQuizData;
  const [selectedType, setSelectedType] =
    useState<QuestionType>("MultipleChoice");
  const [selectedQuantity, setSelectedQuantity] = useState("medium");

  const handleTypeClick = (type: QuestionType) => {
    setSelectedType(type);
  };

  const handleQuantityClick = (qty: string) => {
    setSelectedQuantity(qty);
  };
  const router = useRouter();

  const { mutate, isPending, data } = useMutation({
    mutationFn: generateQuiz,

    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setGeneratedQuizData(data);
      router.push(routes.createQuiz[2].route);
      toast.success("Quiz generated successfully");
    },
    onMutate: () => {
      toast.loading("Generating quiz...", { id: "loading-toast" });
    },
    onSettled() {
      toast.dismiss("loading-toast");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let numberOfQuestions;
    if (selectedQuantity === "low") {
      numberOfQuestions = 5;
    } else if (selectedQuantity === "medium") {
      numberOfQuestions = 10;
    } else if (selectedQuantity === "high") {
      numberOfQuestions = 15;
    }

    if (content && numberOfQuestions && selectedType) {
      mutate({
        content: content,
        numberOfQuestions: numberOfQuestions,
        questionType: selectedType,
      });
    }
  };

  const t = useTranslations("ConfigureQuiz");
  return (
    <form
      onSubmit={handleSubmit}
      className=" md:w-full rounded-lg flex flex-col "
    >
      <div className="flex flex-col bg-content2 gap-4 p-6">
        <span>{t("questionsType")}</span>
        <div className="w-full flex">
          <ButtonGroup
            className="flex flex-col md:flex-row justify-start gap-2 items-start w-full"
            variant="solid"
            color="primary"
            radius="md"
            size="md"
          >
            <Button
              variant={selectedType === "MultipleChoice" ? "solid" : "flat"}
              className="w-full justify-start md:w-auto rounded-lg"
              size="lg"
              startContent={
                selectedType === "MultipleChoice" ? (
                  <TickCircle />
                ) : (
                  <EmptyCircle />
                )
              }
              name="MultipleChoice"
              aria-pressed={selectedType === "MultipleChoice"}
              onClick={() => handleTypeClick("MultipleChoice")}
            >
              <span>{t("multipleChoice")}</span>
            </Button>
            <Button
              variant={selectedType === "TrueFalse" ? "solid" : "flat"}
              className="w-full justify-start md:w-auto rounded-lg"
              size="lg"
              startContent={
                selectedType === "TrueFalse" ? <TickCircle /> : <EmptyCircle />
              }
              name="TrueFalse"
              aria-pressed={selectedType === "TrueFalse"}
              onClick={() => handleTypeClick("TrueFalse")}
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
            className="flex-col w-full gap-2 items-start flex md:flex-row justify-start"
            variant="solid"
            color="primary"
            radius="md"
            size="md"
          >
            <Button
              variant={selectedQuantity === "low" ? "solid" : "flat"}
              className="w-full justify-start md:w-auto rounded-lg"
              size="lg"
              startContent={
                selectedQuantity === "low" ? <TickCircle /> : <EmptyCircle />
              }
              name="low"
              aria-pressed={selectedQuantity === "low"}
              onClick={() => handleQuantityClick("low")}
            >
              <span>{t("low")}</span>
            </Button>
            <Button
              variant={selectedQuantity === "medium" ? "solid" : "flat"}
              className="w-full justify-start md:w-auto rounded-xl"
              size="lg"
              startContent={
                selectedQuantity === "medium" ? <TickCircle /> : <EmptyCircle />
              }
              name="medium"
              aria-pressed={selectedQuantity === "medium"}
              onClick={() => handleQuantityClick("medium")}
            >
              <span>{t("med")}</span>
            </Button>
            <Button
              variant={selectedQuantity === "high" ? "solid" : "flat"}
              className="w-full justify-start md:w-auto rounded-lg"
              size="lg"
              startContent={
                selectedQuantity === "high" ? <TickCircle /> : <EmptyCircle />
              }
              name="high"
              aria-pressed={selectedQuantity === "high"}
              onClick={() => handleQuantityClick("high")}
            >
              <span>{t("high")}</span>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <NavigationControls>
        <NextButton />
      </NavigationControls>
    </form>
  );
}

export default ButtonGroupComponent;
