"use client";
import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useTranslations } from "next-intl";
import { QuizHistoryType } from "@/types";
import DoughnutChart from "./Doughnut";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartsComponent = ({ quiz }: { quiz: QuizHistoryType[] }) => {
  const t = useTranslations("Dashboard");
  const title = t("title");
  useEffect(() => {
    console.log(quiz);
  }, [quiz]);
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };
  if (!quiz || quiz.length === 0) {
    return (
      <div className="flex justify-center font-semibold items-center">
        {t("noDataAvailable")}
      </div>
    );
  }

  const labels = quiz.map((item) => item.quizTitle);
  const label = t("legend");
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: quiz.map((item) => item.quizResult?.scorePercentage),
        backgroundColor: quiz.map((quiz) =>
          quiz?.quizResult?.scorePercentage ?? 0 > 60
            ? "rgba(75, 192, 192, 0.6)"
            : "rgba(255, 99, 132, 0.6)"
        ),
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1>
        {t("amountOfTakenQuizzes")} {quiz.length}
      </h1>
      <Bar options={options} data={data} />
      <DoughnutChart quiz={quiz} />
    </div>
  );
};

export default ChartsComponent;
