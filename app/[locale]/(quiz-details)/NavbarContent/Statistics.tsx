"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
} from "@nextui-org/react";
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
import { Participants, QuizDetail, QuizHistoryType } from "@/types";
import DetailsModal from "../modals/DetailsModal";
import { Button, Skeleton } from "@nextui-org/react";
import { useModalStore } from "@/store/modalStore";
import Stats from "@/components/shared/Stats";

function Statistics({ quiz }: { quiz: QuizDetail }) {
  const t = useTranslations("Dashboard");

  const tableHeaders = [
    t("scoreTableHeader"),
    t("nameTableHeader"),
    t("status"),
    t("timeTableHeader"),
    t("dateTableHeader"),
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
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
          {quiz.participants?.map((participant, index) => (
            <TableRow key={index}>
              <TableCell>{participant?.score + "%" ?? "N/A"}</TableCell>
              <TableCell>{participant?.displayName}</TableCell>
              <TableCell>
                <StatusChip status={participant?.status} />
              </TableCell>
              <TableCell className="text-center md:text-start">
                {formatParticipationTime(participant?.participationDateUtc)}
              </TableCell>
              <TableCell>
                {formatParticipationDate(participant?.participationDateUtc)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}

export default Statistics;
