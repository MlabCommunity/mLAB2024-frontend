"use client";
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
import {
  formatParticipationDate,
  formatParticipationTime,
  formatQuizResult,
  getLastAttempts,
} from "@/utils/helpers";

import { QuizHistoryType } from "@/types";
import DetailsButton from "@/app/[locale]/(quiz-details)/components/statistics/buttons/DetailsButton";
import Chart from "@/app/[locale]/(quiz-details)/components/chart/Chart";
import DetailsModal from "@/app/[locale]/(quiz-details)/modals/DetailsModal";
import StatusChip from "@/app/[locale]/(quiz-details)/components/statistics/StatusChip/StatusChip";
// Updated component to accept props
function Stats({
  quizStats = [],
  isLoading,
  isFetching,
}: {
  quizStats: QuizHistoryType[];
  isLoading: boolean;
  isFetching: boolean;
}) {
  const t = useTranslations("Dashboard");

  const tableHeaders = [
    t("scoreTableHeader"),
    t("nameTableHeader"),
    t("status"),
    t("timeTableHeader"),
    t("dateTableHeader"),
    t("detailsTableHeader"),
  ];

  const filteredStats = getLastAttempts(quizStats);

  const renderTableContent = () => {
    if (isFetching || isLoading) {
      return [...Array(5)].map((_, index) => (
        <TableRow className="bg-white rounded-lg" key={index}>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="text-center md:text-start">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
        </TableRow>
      ));
    }

    return filteredStats.map((stat: QuizHistoryType, index: number) => (
      <TableRow className="bg-white rounded-lg" key={index}>
        <TableCell>{formatQuizResult(stat.quizResult)}</TableCell>
        <TableCell>{stat.quizTitle}</TableCell>
        <TableCell>
          <StatusChip status={stat.status} />
        </TableCell>
        <TableCell className="text-center md:text-start">
          {formatParticipationTime(stat.participationDateUtc)}
        </TableCell>
        <TableCell>
          {formatParticipationDate(stat.participationDateUtc)}
        </TableCell>
        <TableCell>
          {stat.status === "Started" ? (
            <span className="text-foreground-600 text-small">
              {t("inProgress")}
            </span>
          ) : (
            <DetailsButton id={stat?.quizId} />
          )}
        </TableCell>
      </TableRow>
    ));
  };

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
          <Table
            removeWrapper
            color="default"
            className="overflow-x-auto bg-content2 gap-6 p-6 rounded-lg w-full"
          >
            <TableHeader className="flex justify-between rounded-lg">
              {tableHeaders.map((tableHeader, index) => (
                <TableColumn className="uppercase" key={index}>
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
          <Chart quiz={filteredStats} />
        )}
        <DetailsModal quiz={filteredStats} />
      </motion.div>
    </motion.section>
  );
}

export default Stats;
