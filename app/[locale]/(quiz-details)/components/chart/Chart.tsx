import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslations } from "next-intl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface QuizItem {
  name: string;
  scorePercentage: number;
}

const ChartComponent = ({ quiz }: { quiz: QuizItem[] }) => {
  const t = useTranslations("ChartModal");
  const title = t("title");
  const options = {
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
          callback: (value: string) => {
            return value + "%";
          },
        },
      },
    },
  };

  if (!quiz) {
    return <div>No data available</div>;
  }

  const labels = quiz.map((item) => item.name);
  const label = t("legend");
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: quiz.map((item) => item.scorePercentage),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Bar options={options} data={data} />
    </div>
  );
};

export default ChartComponent;
