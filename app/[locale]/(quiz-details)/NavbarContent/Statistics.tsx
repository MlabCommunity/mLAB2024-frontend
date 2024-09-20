"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import DetailsButton from "../components/statistics/buttons/DetailsButton";
import NavbarContentContainer from "@/components/NavbarContentContainer";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ChartModal from "../modals/ChartModal";
import { useStats } from "../quiz-details/hooks/useStats";
import {
  formatQuizResult,
  formatParticipationDate,
  formatParticipationTime,
} from "@/utils/helpers";
import StatusChip from "../components/statistics/StatusChip/StatusChip";
import { QuizHistoryType } from "@/types";
import DetailsModal from "../modals/DetailsModal";
import { Skeleton } from "@nextui-org/react";

function Statistics() {
  const t = useTranslations("quizDetails");
  const { stats, isLoading } = useStats();

  const tableHeaders = [
    t("scoreTableHeader"),
    t("nameTableHeader"),
    "Status",
    t("timeTableHeader"),
    t("dateTableHeader"),
    t("detailsTableHeader"),
  ];
  return (
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
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            emptyContent={t("noQuizTakenDialogue")}
            className="bg-white rounded-lg"
          >
            {isLoading
              ? [...Array(stats)].map((_, index) => (
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
                ))
              : stats &&
                stats.map((stat: QuizHistoryType, index: number) => (
                  <TableRow className="bg-white rounded-lg" key={index}>
                    <TableCell>{formatQuizResult(stat.quizResult)}</TableCell>
                    <TableCell>{stat.quizTitle}</TableCell>
                    <TableCell>
                      {stat.status === "Started" && (
                        <StatusChip status={"Started"} />
                      )}
                      {stat.status === "Stopped" && (
                        <StatusChip status={"Stopped"} />
                      )}
                      {stat.status === "Finished" && (
                        <StatusChip status={"Finished"} />
                      )}
                    </TableCell>
                    <TableCell className="text-center md:text-start">
                      {formatParticipationTime(stat.participtionDateUtc)}
                    </TableCell>
                    <TableCell>
                      {formatParticipationDate(stat.participtionDateUtc)}
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
                ))}
          </TableBody>
        </Table>
      </NavbarContentContainer>
      <DetailsModal quiz={stats} />
      <ChartModal finishedQuiz={stats} />
    </motion.div>
  );
}

export default Statistics;
