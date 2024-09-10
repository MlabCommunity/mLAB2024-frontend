import React from "react";
import Container from "@/components/shared/Container";
import { Button, Progress } from "@nextui-org/react";
import { cn } from "@/lib";
import checkCircle from "@/public/assets/check-circle.svg";
import cancelCircle from "@/public/assets/circle-cancel.svg";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { HistoryItemT } from "../types";

interface HistoryResultsProps {
  correctAnswers: number;
  quizLength: number;
  history: HistoryItemT[];
}

const HistoryResults = ({
  correctAnswers,
  quizLength,
  history,
}: HistoryResultsProps) => {
  const t = useTranslations("TakeQuiz");
  return (
    <Container>
      <section className="bg-default-100 py-8 max-w-3xl mx-auto px-6 flex flex-col gap-6 mt-8 rounded-lg">
        <Progress
          aria-label="Progress"
          value={100}
          color="primary"
          className="w-full"
        />
        <div className="flex justify-between">
          <p className="text-4xl text-foreground-700 font-semibold">
            {t("quizResults")}
          </p>
          <p className="text-foreground-600">
            {t("yourScore")}: {correctAnswers}/{quizLength}
          </p>
        </div>
        {history.map((historyItem, index) => (
          <div
            key={index}
            className="bg-default-100 p-4 mb-4 border-dashed border-2 rounded-lg flex justify-between items-start shadow-sm"
          >
            <div className="w-full">
              <h3 className="font-bold mb-2">
                {index + 1}. {historyItem.question}
              </h3>
              <div className="space-y-2">
                {historyItem.options.map((option, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center p-2 rounded-lg cursor-pointer w-full bg-white justify-between",
                      option.properValue && "bg-success-100",
                      historyItem.selectedAnswer === option.answer &&
                        !historyItem.isCorrect &&
                        "bg-danger-100"
                    )}
                  >
                    <div className="flex">
                      <span className="font-medium text-gray-700">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <div className="border-l border-gray-300 h-6 mx-2"></div>
                      <span className="text-gray-700">{option.answer}</span>
                    </div>
                    {historyItem.selectedAnswer === option.answer &&
                      option.properValue && (
                        <Image src={checkCircle} alt="cancel circle ml-auto" />
                      )}
                    {historyItem.selectedAnswer === option.answer &&
                      !historyItem.isCorrect && (
                        <Image src={cancelCircle} alt="cancel circle ml-auto" />
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <Link href={routes.dashboard} className="ml-auto">
          <Button variant="flat" color="primary">
            {t("home")}
          </Button>
        </Link>
      </section>
    </Container>
  );
};

export default HistoryResults;
