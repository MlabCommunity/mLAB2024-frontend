"use client";
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTranslations } from "next-intl";

ChartJS.register(ArcElement, Tooltip, Legend);

interface QuizResultType {
  correctAnswers: number;
  totalQuestions: number;
}

interface QuizHistoryType {
  quizResult: QuizResultType;
}

const DoughnutChart = ({ quiz }: { quiz: QuizHistoryType[] }) => {
  const t = useTranslations("Dashboard");
  const correctAnswers = quiz.map(
    (quizItem) => quizItem?.quizResult?.correctAnswers
  );
  const totalQuestions = quiz.map(
    (quizItem) => quizItem?.quizResult?.totalQuestions
  );
  const incorrectAnswers = totalQuestions.map(
    (total, index) => total - correctAnswers[index]
  );

  const sumCorrectAnswers = correctAnswers.reduce(
    (sum, current) => sum + (current || 0),
    0
  );
  const sumTotalQuestions = totalQuestions.reduce(
    (sum, current) => sum + (current || 0),
    0
  );
  useEffect(() => {
    console.log(sumCorrectAnswers, sumTotalQuestions);
  }, [sumTotalQuestions, sumCorrectAnswers]);
  const data = {
    labels: [t("correctAnswers"), t("incorrectAnswers")],
    datasets: [
      {
        data: [sumCorrectAnswers, sumTotalQuestions],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Answer Distribution",
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
