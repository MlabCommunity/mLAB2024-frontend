'use client'
import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGetSingleQuiz } from "@/utils/hooks/useGetSingleQuiz";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { cn } from "@/lib";
import dynamic from "next/dynamic";
import QuestionsSkeleton from "../../components/skeletons/QuestionsSkeleton";
import SettingsSkeleton from "../../components/skeletons/SettingsSkeleton";
import StatisticsSkeleton from "../../components/skeletons/StatisticsSkeleton";
import GeneralSkeleton from "../../components/skeletons/GeneralSkeleton";
import QuizDetailsInfoSkeleton from "../../components/skeletons/QuizDetailsInfoSkeleton";
import { useQuizDetailStore } from "@/store/quizDetailsStore";
import QuizDetailsInfo from "../../components/QuizDetailsInfo";
import { motion, useScroll } from "framer-motion";

const Questions = dynamic(() => import("../../NavbarContent/Questions"), {
  ssr: false,
  loading: () => <QuestionsSkeleton />,
});
const Settings = dynamic(() => import("../../NavbarContent/Settings"), {
  ssr: false,
  loading: () => <SettingsSkeleton />,
});
const Statistics = dynamic(() => import("../../NavbarContent/Statistics"), {
  ssr: false,
  loading: () => <StatisticsSkeleton />,
});
const General = dynamic(() => import("../../NavbarContent/General"), {
  ssr: false,
  loading: () => <GeneralSkeleton />,
});

const QuizDetailsPage = ({ params }: { params: { quizId: string } }) => {
  const { scrollYProgress } = useScroll();
  const { setStatus, setQuestionsData, setAvailability } = useQuizDetailStore();
  const { data: singleQuizData, isFetching } = useGetSingleQuiz(params.quizId);
  const [activeTab, setActiveTab] = useState("Questions");
  const t = useTranslations("QuestionsOnAnswers");

  useEffect(() => {
    if (singleQuizData) {
      setQuestionsData(singleQuizData?.questions || []);
      setStatus(singleQuizData?.status || "Active");
      setAvailability(singleQuizData?.availability || "Public");
    }
  }, [singleQuizData]);

  useEffect(() => {
    setActiveTab("Questions");
  }, []);

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

  const renderTabContent = useCallback(
    (activeTab: string) => {
      if (isFetching) {
        return <QuestionsSkeleton />;
      }
      switch (activeTab) {
        case "Questions":
          return <Questions />;
        case "Settings":
          return <Settings quizId={singleQuizData?.id} />;
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
    },
    [activeTab, singleQuizData, isFetching]
  );

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left"
      />
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
              <QuizDetailsInfoSkeleton />
            ) : (
              <QuizDetailsInfo
                title={singleQuizData?.title}
                description={singleQuizData?.description}
              />
            )}
          </div>
          <nav
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
    </>
  );
};

export default QuizDetailsPage;
