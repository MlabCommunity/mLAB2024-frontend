import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import TickCircle from "@/generate-quiz-components/TickCircle";
import EmptyCircle from "@/generate-quiz-components/EmptyCircle";
import NextButton from "@/generate-quiz-components/NextButton";
import { useRouter, useSearchParams } from "next/navigation";
import NavigationControls from "@/generate-quiz-components/NavigationControls";
import { routes } from "@/routes";
import { useLocale, useTranslations } from "next-intl";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { generateQuiz } from "@/utils/actions/quiz/generateQuiz";
import { useStepperStore } from "@/store/stepperStore";

function ButtonGroupComponent() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const t = useTranslations("ConfigureQuiz");
  const router = useRouter();
  const { generateQuizData, setGeneratedQuizData } = useGenerateQuizStore();
  const { Content, Attachments } = generateQuizData;
  const { addVisitedRoute, setCurrentRoute } = useStepperStore();
  const [selectedType, setSelectedType] = useState("SingleChoice");
  const [selectedQuantity, setSelectedQuantity] = useState("medium");
  const [selectedLanguage, setSelectedLanguage] = useState(
    locale === "en" ? "English" : "Polish"
  );

  const { mutate, isPending } = useMutation({
    mutationFn: generateQuiz,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      const params = new URLSearchParams(searchParams);
      setGeneratedQuizData(data);
      addVisitedRoute(routes.quizPreview.pathname); // Update this line
      setCurrentRoute(routes.quizPreview.pathname); // Set the current route

      params.set("selectedType", selectedType);
      router.push(`${routes.quizPreview.pathname}?${params.toString()}`);
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
      { low: 5, medium: 10, high: 15 }[selectedQuantity] ?? 0;
    const formData = new FormData();
    formData.append("Content", Content as string);
    formData.append("NumberOfQuestions", numberOfQuestions.toString());
    formData.append("QuestionTypes", selectedType);
    formData.append("Language", selectedLanguage);
    Attachments?.forEach((attachment) => {
      formData.append("Attachments", attachment);
    });

    mutate(formData);
  };

  const options = {
    questionTypes: [
      { label: t("singleChoice"), value: "SingleChoice" },
      { label: t("trueFalse"), value: "TrueFalse" },
    ],
    quantities: [
      { label: 5, value: "low" },
      { label: 10, value: "medium" },
      { label: 15, value: "high" },
    ],
    languages: [
      { label: t("english"), value: "English" },
      { label: t("polish"), value: "Polish" },
      { label: t("german"), value: "German" },
      { label: t("spanish"), value: "Spanish" },
      { label: t("french"), value: "French" },
      { label: t("italian"), value: "Italian" },
    ],
  };

  const renderButtonGroup = (
    title: string,
    items: { label: number | string; value: string }[],
    selectedValue: string,
    setSelectedValue: (value: string) => void
  ) => (
    <div className="flex flex-col bg-content2 gap-4 p-6 rounded-lg">
      <span className="text-lg font-semibold">{title}</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 auto-cols-fr">
        {items.map((item) => (
          <Button
            key={item.value}
            color="primary"
            variant={selectedValue === item.value ? "solid" : "flat"}
            className="w-full justify-start rounded-lg flex-1 min-h-[48px]"
            size="lg"
            isDisabled={isPending}
            startContent={
              selectedValue === item.value ? <TickCircle /> : <EmptyCircle />
            }
            name={item.value}
            aria-pressed={selectedValue === item.value}
            onClick={() => setSelectedValue(item.value)}
          >
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-lg flex flex-col gap-4"
    >
      {renderButtonGroup(
        t("questionsType"),
        options.questionTypes,
        selectedType,
        setSelectedType
      )}
      {renderButtonGroup(
        t("howManyQuestions"),
        options.quantities,
        selectedQuantity,
        setSelectedQuantity
      )}
      {renderButtonGroup(
        t("languages"),
        options.languages,
        selectedLanguage,
        setSelectedLanguage
      )}

      <NavigationControls isPending={isPending}>
        <NextButton isPending={isPending} />
      </NavigationControls>
    </form>
  );
}

export default ButtonGroupComponent;
