"use client";
import { format, parseISO } from "date-fns"; // Importing the required functions
import { QuizResult } from "@/types";
export const getPluralForm = (count: number, key: string) => {
  if (count === 1) return `${key}_one`;
  if (count > 1 && count < 5) return `${key}_few`;
  return `${key}_many`;
};

export const getJoinCode = (url: string) => {
  if (!url) return "";

  const parts = url.split(".io/");
  return parts.length > 1 ? parts[1] : "";
};
export const createNewQuizURL = (originalUrl: string) => {
  return `https://learngoquizzes.com/quiz/${originalUrl}`;
};
export const formatQuizResult = (quizResult?: QuizResult) => {
  if (!quizResult) {
    return "N/A";
  }
  return quizResult &&
    typeof quizResult.correctAnswers === "number" &&
    typeof quizResult.totalQuestions === "number"
    ? `${quizResult.correctAnswers}/${quizResult.totalQuestions}`
    : "N/A";
};
export const formatParticipationDate = (utcDateString: string) => {
  if (utcDateString) {
    const date = new Date(utcDateString);
    return date.toLocaleDateString();
  }
  return "N/A";
};

export const formatParticipationTime = (utcDateString: string) => {
  if (utcDateString) {
    const date = new Date(utcDateString);
    return date.toLocaleTimeString();
  }
  return "N/A";
};
