import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useTranslations } from "next-intl";
import { QuizHistoryType } from "@/types";
import { useTheme } from "next-themes";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ quiz }: { quiz: QuizHistoryType[] }) => {
  const t = useTranslations("Dashboard");
  const { theme } = useTheme();

  const { sumCorrectAnswers, sumIncorrectAnswers } = useMemo(() => {
    const correctAnswers = quiz.reduce(
      (sum, quizItem) => sum + (quizItem?.quizResult?.correctAnswers || 0),
      0
    );
    const totalQuestions = quiz.reduce(
      (sum, quizItem) => sum + (quizItem?.quizResult?.totalQuestions || 0),
      0
    );
    const incorrectAnswers = totalQuestions - correctAnswers;

    return {
      sumCorrectAnswers: correctAnswers,
      sumIncorrectAnswers: incorrectAnswers,
    };
  }, [quiz]);

  const data = useMemo(
    () => ({
      labels: [t("correctAnswers"), t("incorrectAnswers")],
      datasets: [
        {
          data: [sumCorrectAnswers, sumIncorrectAnswers],
          backgroundColor: ["rgba(39, 208, 85, 0.8)", "#FF6384"],
          hoverBackgroundColor: ["rgba(29, 158, 65, 0.8)", "#E03F68"],
        },
      ],
    }),
    [sumCorrectAnswers, sumIncorrectAnswers, t]
  );

  const options: ChartOptions<"doughnut"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            color: theme === "light" ? "#404040" : "#e2e2e2",
            font: {
              size: 14,
            },
          },
        },
        title: {
          display: true,
          text: t("answerDistribution"),
          color: theme === "light" ? "#404040" : "#e2e2e2",
          font: {
            size: 24,
          },
        },
      },
    }),
    [t, theme]
  );

  return (
    <div className="w-full h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
