"use client";
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
