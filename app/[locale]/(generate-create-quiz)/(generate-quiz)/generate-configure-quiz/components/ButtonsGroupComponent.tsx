"use client";
import React, { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import TickCircle from "./TickCircle";
import EmptyCircle from "./EmptyCircle";
import NextButton from "../../generate-quiz/components/buttons/NextButton";
import { useRouter } from "next/navigation";
import NavigationControls from "../../generate-quiz/components/buttons/NavigationControls";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { QuestionTypeT } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { generateQuiz } from "@/utils/actions/quiz/generateQuiz";

function ButtonGroupComponent() {
  const t = useTranslations("ConfigureQuiz");
  const router = useRouter();
  const { generateQuizData, setGeneratedQuizData } = useGenerateQuizStore();
  const { content } = generateQuizData;

  const [selectedType, setSelectedType] =
    useState<QuestionTypeT>("MultipleChoice");
  const [selectedQuantity, setSelectedQuantity] = useState("medium");

  const { mutate, isPending } = useMutation({
    mutationFn: generateQuiz,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setGeneratedQuizData(data);
      router.push(routes.createQuiz[2].route);
      toast.success(t("generatedSuccessfullyMsg"));
    },
    onMutate: () => {
      toast.loading(t("generating"), { id: "loading-toast" });
    },
    onSettled() {
      toast.dismiss("loading-toast");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numberOfQuestions = {
      low: 5,
      medium: 10,
      high: 15,
    }[selectedQuantity];

    if (content && numberOfQuestions && selectedType) {
      mutate({
        content: content,
        numberOfQuestions: numberOfQuestions,
        questionTypes: [selectedType],
      });
    }
  };

  const questionTypes = [
    { label: t("multipleChoice"), value: "MultipleChoice" },
    { label: t("trueFalse"), value: "TrueFalse" },
  ];

  const quantities = [
    { label: t("low"), value: "low" },
    { label: t("med"), value: "medium" },
    { label: t("high"), value: "high" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-full rounded-lg flex flex-col"
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
            {questionTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "solid" : "flat"}
                className="w-full justify-start md:w-auto rounded-lg"
                size="lg"
                startContent={
                  selectedType === type.value ? <TickCircle /> : <EmptyCircle />
                }
                name={type.value}
                aria-pressed={selectedType === type.value}
                onClick={() => setSelectedType(type.value as QuestionTypeT)}
                isDisabled={isPending}
              >
                <span>{type.label}</span>
              </Button>
            ))}
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
            isDisabled={isPending}
          >
            {quantities.map((quantity) => (
              <Button
                key={quantity.value}
                variant={selectedQuantity === quantity.value ? "solid" : "flat"}
                className="w-full justify-start md:w-auto rounded-lg"
                size="lg"
                isDisabled={isPending}
                startContent={
                  selectedQuantity === quantity.value ? (
                    <TickCircle />
                  ) : (
                    <EmptyCircle />
                  )
                }
                name={quantity.value}
                aria-pressed={selectedQuantity === quantity.value}
                onClick={() => setSelectedQuantity(quantity.value)}
              >
                <span>{quantity.label}</span>
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
      <NavigationControls isPending={isPending}>
        <NextButton isPending={isPending} />
      </NavigationControls>
    </form>
  );
}

export default ButtonGroupComponent;
