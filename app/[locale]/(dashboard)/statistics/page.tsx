import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  Skeleton,
} from "@nextui-org/react";
import NavbarContentContainer from "@/components/NavbarContentContainer";
import DetailsModal from "../../(quiz-details)/modals/DetailsModal";
import {
  formatParticipationDate,
  formatParticipationTime,
  formatQuizResult,
} from "@/utils/helpers";
import StatusChip from "../../(quiz-details)/components/statistics/StatusChip/StatusChip";
import DetailsButton from "../../(quiz-details)/components/statistics/buttons/DetailsButton";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useStats } from "../../(quiz-details)/quiz-details/hooks/useStats";
import { QuizHistoryType } from "@/types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatisticsPage = () => {
  const t = useTranslations("Dashboard");
  const { data: stats, isLoading, isFetching } = useStats();
  
  const tableHeaders = [
    t("scoreTableHeader"),
    t("nameTableHeader"),
    t("status"),
    t("timeTableHeader"),
    t("dateTableHeader"),
    t("detailsTableHeader"),
  ];
  const quizStats: QuizHistoryType[] = stats || [];

  const renderTableContent = () => {
    if (isFetching || isLoading) {
      return [...Array(5)].map((_, index) => (
        <TableRow className="bg-gray-200 dark:bg-gray-800 rounded-lg" key={index}>
          <TableCell><Skeleton className="h-6 w-full" /></TableCell>
          <TableCell><Skeleton className="h-6 w-full" /></TableCell>
          <TableCell><Skeleton className="h-6 w-full" /></TableCell>
          <TableCell className="text-center md:text-start"><Skeleton className="h-6 w-full" /></TableCell>
          <TableCell><Skeleton className="h-6 w-full" /></TableCell>
          <TableCell><Skeleton className="h-6 w-full" /></TableCell>
        </TableRow>
      ));
    }

    return quizStats.map((stat: QuizHistoryType, index: number) => (
      <TableRow className="bg-gray-200 dark:bg-gray-800 rounded-lg" key={index}>
        <TableCell className="text-black dark:text-white">{formatQuizResult(stat.quizResult)}</TableCell>
        <TableCell className="text-black dark:text-white">{stat.quizTitle}</TableCell>
        <TableCell><StatusChip status={stat.status} /></TableCell>
        <TableCell className="text-center md:text-start text-black dark:text-white">
          {formatParticipationTime(stat.participationDateUtc)}
        </TableCell>
        <TableCell className="text-black dark:text-white">
          {formatParticipationDate(stat.participationDateUtc)}
        </TableCell>
        <TableCell>
          {stat.status === "Started" ? (
            <span className="text-black dark:text-white text-small">{t("inProgress")}</span>
          ) : (
            <DetailsButton id={stat?.quizId} />
          )}
        </TableCell>
      </TableRow>
    ));
  };

  const chartData = {
    labels: quizStats.map((stat) => formatParticipationDate(stat.participationDateUtc)),
    datasets: [
      {
        label: "Quiz Scores",
        data: quizStats.map((stat) => stat.quizResult),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  if (!stats || stats.length === 0) {
    return (
      <div className="flex w-full font-semibold text-foreground-600 text-2xl items-center justify-center">
        {t("noDataAvailable")}
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8 w-full md:max-w-7xl"
    >
      <h2 className="text-4xl font-bold mb-4 text-foreground-700">
        {t("statistics")}
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <NavbarContentContainer>
          <Table removeWrapper color="default" className="overflow-x-auto gap-6 p-6 rounded-lg w-full">
            <TableHeader className="flex justify-between rounded-lg">
              {tableHeaders.map((tableHeader, index) => (
                <TableColumn className="uppercase bg-gray-200 dark:bg-gray-800 text-black dark:text-white" key={index}>
                  <div className="flex items-center justify-between gap-2">
                    <span>{tableHeader}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label={t("filterArrow")}
                    >
                      <path
                        d="M2.7193 10.0333L7.06596 5.68666C7.5793 5.17332 8.4193 5.17332 8.93263 5.68666L13.2793 10.0333"
                        stroke="#11181C"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody emptyContent={t("noQuizTakenDialogue")}>
              {renderTableContent()}
            </TableBody>
          </Table>
        </NavbarContentContainer>

        {isFetching ? (
          <Skeleton className="h-[400px]" />
        ) : (
          <Line data={chartData} />
        )}
        <DetailsModal quiz={quizStats} />
      </motion.div>
    </motion.section>
  );
};

export default StatisticsPage;
