"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentChart, setCurrentChart] = useState<"bar" | "doughnut">("bar");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: isMobile ? 12 : 16,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: isMobile ? 18 : 24,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            size: isMobile ? 10 : 14,
          },
          callback: function (value) {
            return value + "%";
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 10 : 14,
          },
        },
      },
    },
  };

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

  if (!quiz || quiz.length === 0) {
    return (
      <div className="flex justify-center font-semibold items-center p-4">
        {t("noDataAvailable")}
      </div>
    );
  }

  const handleChartSwitch = (direction: "left" | "right") => {
    setCurrentChart(direction === "left" ? "bar" : "doughnut");
  };

  return (
    <div className=" w-full h-auto flex flex-col gap-4 p-2 sm:p-4">
      <div className="flex sm:flex-row justify-between items-center mb-2 sm:mb-4">
        <h1 className="text-foreground-600 font-semibold text-sm sm:text-base mb-2 sm:mb-0">
          {t("amountOfTakenQuizzes")} {quiz.length}
        </h1>
        <div className="flex items-center gap-2 sm:gap-4">
          {currentChart === "doughnut" && (
            <button
              className="p-1 sm:p-2 text-blue-500"
              onClick={() => handleChartSwitch("left")}
            >
              <FaArrowLeft size={isMobile ? 18 : 24} />
            </button>
          )}
          {currentChart === "bar" && (
            <button
              className="p-1 sm:p-2 text-blue-500"
              onClick={() => handleChartSwitch("right")}
            >
              <FaArrowRight size={isMobile ? 18 : 24} />
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-[300px] sm:h-[400px]  overflow-hidden relative">
        <AnimatePresence>
          {currentChart === "bar" ? (
            <motion.div
              className="w-full h-full flex justify-center"
              key="bar-chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bar options={options} data={data} />
            </motion.div>
          ) : (
            <motion.div
              className="w-full h-full mx-auto"
              key="doughnut-chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DoughnutChart quiz={quiz} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChartsComponent;
