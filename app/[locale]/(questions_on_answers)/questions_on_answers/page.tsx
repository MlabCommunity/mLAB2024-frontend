"use client";
import React, { useRef, useState } from "react";
import General from "../NavbarContent/General";
import Questions from "../NavbarContent/Questions";
import Statistics from "../NavbarContent/Statistics";
import Settings from "../NavbarContent/Settings";
import { useTranslations } from "next-intl";
import mockQuizzes from "../mockData/mockQuizzes.json";
const QuizDetail = () => {
  const [enabled, setEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("Questions");

  // Insert the json api response for future requests
  const [quizData, setQuizData] = useState(mockQuizzes);
  const navRef = useRef(null);
  const t = useTranslations("QuestionsOnAnswers");
  const handleNavbarChange = (e: React.BaseSyntheticEvent) => {
    const target = e.target.getAttribute("data-navbar-item");
    if (target && target !== activeTab) {
      console.log(target);
      setActiveTab(target);
    }
  };

  const renderTabContent = function (activeTab: string) {
    switch (activeTab) {
      case "Questions":
        return (
          <Questions
            quizData={quizData}
            enabled={enabled}
            setEnabled={setEnabled}
            setQuizData={setQuizData}
          />
        );
      case "Settings":
        return <Settings />;
      case "Statistics":
        return <Statistics />;
      case "General":
        return <General />;
      default:
        return (
          <Questions
            quizData={quizData}
            enabled={enabled}
            setEnabled={setEnabled}
            setQuizData={setQuizData}
          />
        );
    }
  };

  return (
    <div className="bg-white w-full md:max-w-7xl">
      <div className="bg-white p-4 md:p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">{t("detailQuizzHeading")}</h1>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            {t("shareQuizzButton")}
          </button>
        </div>

        <div className="bg-gray-100 p-4 mb-6 rounded-lg shadow-md">
          <h2 className="font-bold text-lg">
            Title: Understanding Cryptocurrencies and Their Impact on Finance
          </h2>
          <p className="text-gray-600">
            Explore how cryptocurrencies like Bitcoin and Ethereum are
            transforming the financial landscape through decentralization,
            blockchain technology, and the potential for high returns, while
            also discussing risks and regulatory challenges.
          </p>
        </div>

        <nav
          ref={navRef}
          onClick={(e) => handleNavbarChange(e)}
          className="flex gap-2 md:w-1/2 w-full space-x-6 mb-6 bg-gray-100 p-2 rounded-lg overflow-x-auto"
        >
          <a
            href="#"
            className={`px-2 py-2 rounded-lg whitespace-nowrap ${
              activeTab === "Questions"
                ? "bg-white font-semibold text-gray-600"
                : "bg-gray-100 text-gray-600"
            }`}
            data-navbar-item="Questions"
          >
            {t("questions")}
          </a>
          <a
            href="#"
            className={`px-2 py-2 rounded-lg whitespace-nowrap ${
              activeTab === "Settings"
                ? "bg-white font-semibold text-gray-600"
                : "bg-gray-100 text-gray-600"
            }`}
            data-navbar-item="Settings"
          >
            {t("settings")}
          </a>
          <a
            href="#"
            className={`px-2 py-2 rounded-lg whitespace-nowrap ${
              activeTab === "Statistics"
                ? "bg-white font-semibold text-gray-600"
                : "bg-gray-100 text-gray-600"
            }`}
            data-navbar-item={"Statistics"}
          >
            {t("statistics")}
          </a>
          <a
            href="#"
            className={`px-2 py-2 rounded-lg whitespace-nowrap ${
              activeTab === "General"
                ? "bg-white font-semibold text-gray-600"
                : "bg-gray-100 text-gray-600"
            }`}
            data-navbar-item={"General"}
          >
            {t("general")}
          </a>
        </nav>

        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

export default QuizDetail;
