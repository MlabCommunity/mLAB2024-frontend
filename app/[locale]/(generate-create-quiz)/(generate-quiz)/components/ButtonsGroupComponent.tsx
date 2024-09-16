"use client";
import React, { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import TickCircle from "./TickCircle";
import EmptyCircle from "./EmptyCircle";
import NextButton from "./buttons/NextButton";
import { useRouter, useSearchParams } from "next/navigation";
import NavigationControls from "./buttons/NavigationControls";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { generateQuiz } from "@/utils/actions/quiz/generateQuiz";

function ButtonGroupComponent() {
  const searchParams = useSearchParams();
  const t = useTranslations("ConfigureQuiz");
  const router = useRouter();
  const { generateQuizData, setGeneratedQuizData } = useGenerateQuizStore();
  const { Content, Attachments } = generateQuizData;

  const [selectedType, setSelectedType] = useState("MultipleChoice");
  const [selectedQuantity, setSelectedQuantity] = useState("medium");

  const { mutate, isPending } = useMutation({
    mutationFn: generateQuiz,
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      const params = new URLSearchParams(searchParams);
      setGeneratedQuizData(data);
      params.set("selectedType", selectedType);
      router.push(`${routes.createQuiz[2].route}?${params.toString()}`);
      toast.success(t("generatedSuccessfullyMsg"));
    },
    onMutate: () => {
      toast.loading(t("generating"), { id: "loading-toast" });
    },
    onSettled() {
      toast.dismiss("loading-toast");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numberOfQuestions =
      {
        low: 5,
        medium: 10,
        high: 15,
      }[selectedQuantity] ?? 0;
    const formData = new FormData();
    formData.append("Content", Content as string);
    formData.append("NumberOfQuestions", numberOfQuestions.toString()); //
    formData.append("QuestionTypes", selectedType); //
    Attachments?.forEach((attachement) => {
      formData.append("Attachments", attachement);
    });
    formData.forEach((value, key) => {
      console.log([key, value]);
    });

    mutate(formData);
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
      <div className="flex flex-col bg-content2 gap-4 p-6 rounded-t-lg">
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
                onClick={() => setSelectedType(type.value)}
                isDisabled={isPending}
              >
                <span>{type.label}</span>
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
      <div>
        <div className="gap-4 p-6 flex flex-col bg-content2 rounded-b-lg">
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
