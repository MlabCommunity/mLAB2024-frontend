"use client";
import React, { useEffect, useRef, useState } from "react";
import General from "../../NavbarContent/General";
import Questions from "../../NavbarContent/Questions";
import Statistics from "../../NavbarContent/Statistics";
import Settings from "../../NavbarContent/Settings";
import { useTranslations } from "next-intl";
import { useGetSingleQuiz } from "@/utils/hooks/useGetSingleQuiz";
import Link from "next/link";
import { Button, Skeleton } from "@nextui-org/react";
import { cn } from "@/lib";

const QuizDetail = ({ params }: { params: { quizId: string } }) => {
  const { data: singleQuizData, isFetching } = useGetSingleQuiz(params.quizId);
  const [questions, setQuestions] = useState(singleQuizData?.questions || []);
  const [status, setStatus] = useState(singleQuizData?.status || "Active");
  const [availability, setAvailability] = useState(
    singleQuizData?.status || "Public"
  );
  const [activeTab, setActiveTab] = useState("Questions");
  const navRef = useRef(null);
  const t = useTranslations("QuestionsOnAnswers");

  useEffect(() => {
    if (singleQuizData) {
      setQuestions(singleQuizData?.questions || []);
    }
  }, [singleQuizData]);

  const handleNavbarChange = (e: React.BaseSyntheticEvent) => {
    const target = e.target.getAttribute("data-navbar-item");
    if (target && target !== activeTab) {
      setActiveTab(target);
    }
  };

  const tabs = [
    { label: t("questions"), value: "Questions" },
    { label: t("settings"), value: "Settings" },
    { label: t("statistics"), value: "Statistics" },
    { label: t("general"), value: "General" },
  ];

  console.log(isFetching);

  const renderTabContent = (activeTab: string) => {
    switch (activeTab) {
      case "Questions":
        return (
          <Questions
            questions={questions}
            setQuestions={setQuestions}
            isFetching={isFetching}
          />
        );
      case "Settings":
        return (
          <Settings
            status={status}
            setStatus={setStatus}
            availability={availability}
            setAvailability={setAvailability}
          />
        );
      case "Statistics":
        return <Statistics />;
      case "General":
        return (
          <General
            title={singleQuizData.title}
            description={singleQuizData.description}
          />
        );
    }
  };

  return (
    <div className="bg-white w-full md:max-w-7xl">
      <div className="bg-white p-4 md:p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t("detailQuizzHeading")}</h2>
          <Button color="primary" isDisabled={isFetching}>
            {t("shareQuizzButton")}
          </Button>
        </div>
        <div className="bg-foreground-100 p-4 mb-6 rounded-lg shadow-md">
          {isFetching ? (
            <Skeleton className="w-1/2 h-10 rounded-lg" />
          ) : (
            <h3 className="font-bold text-lg text-foreground-800">
              {singleQuizData?.title}
            </h3>
          )}

          {isFetching ? (
            <Skeleton className="w-full h-7 mt-2 rounded-lg" />
          ) : (
            <p className="text-foreground-600">{singleQuizData?.description}</p>
          )}
        </div>
        <nav
          ref={navRef}
          onClick={handleNavbarChange}
          className="flex gap-2 w-full md:w-min space-x-6 mb-6 bg-default-100 p-2 rounded-lg overflow-x-auto"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href="#"
              className={cn(
                "px-2 py-2 rounded-lg whitespace-nowrap",
                activeTab === tab.value
                  ? "bg-white text-default-foreground"
                  : "text-default-500",
                isFetching && "pointer-events-none"
              )}
              data-navbar-item={tab.value}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

export default QuizDetail;
