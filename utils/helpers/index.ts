"use client";
import { QuizHistoryType, QuizResult } from "@/types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
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

export function getUserRoleFromJWT() {
  const token = Cookies.get("AccessToken") as string;
  const JWT_ROLE_CLAIM =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const decoded = jwtDecode(token);
  const role = decoded[JWT_ROLE_CLAIM as keyof typeof decoded];
  return role;
}
export const getLastAttempts = (stats: QuizHistoryType[]) => {
  const lastAttempts = stats?.reduce((acc, stat) => {
    if (
      !acc[stat.quizId] ||
      new Date(stat.participationDateUtc) >
        new Date(acc[stat.quizId].participationDateUtc)
    ) {
      acc[stat.quizId] = stat;
    }
    return acc;
  }, {} as Record<string, QuizHistoryType>);

  return Object.values(lastAttempts);
};
export const shortenStatsLabel = (label: string) => {
  return label.length > 15 ? label.slice(0, 15) + "..." : label;
};
