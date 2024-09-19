"use client";
import React, { useEffect } from "react";
import { format } from "date-fns";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import DetailsButton from "../components/statistics/buttons/DetailsButton";
import StatusChip from "../components/statistics/StatusChip/StatusChip";
import EventDuration from "../components/statistics/QuizDurationTIme/QuizDurationTime";
import NavbarContentContainer from "@/components/NavbarContentContainer";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ChartModal from "../modals/ChartModal";
import { useStats } from "../quiz-details/hooks/useStats";
function Statistics({ id }: { id: string }) {
  const date = new Date();
  const formatedDate = format(date, "dd.MM.yyyy");
  const t = useTranslations("quizDetails");

  const { user, stats, isLoading, isError } = useStats();
  useEffect(() => {
    console.log(user, stats);
  });

  const tableHeaders = [
    t("scoreTableHeader"),
    t("nameTableHeader"),
    "E-mail",
    "Status",
    t("timeTableHeader"),
    t("dateTableHeader"),
    t("detailsTableHeader"),
  ];
  const filterByQuizId = stats.;
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
          className=" overflow-x-auto bg-content2  gap-6 p-6 rounded-lg w-full"
        >
          <TableHeader className=" flex justify-between rounded-lg ">
            {tableHeaders.map((tableHeader, index) => (
              <TableColumn className="uppercase " key={index}>
                <div className="flex items-center justify-between gap-2">
                  <span>{tableHeader}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
            emptyContent={"You didn't take any quiz"}
            className="bg-white rounded-lg"
          >
            {stats &&
              stats?.map((stat) => (
                <TableRow className="bg-white rounded-lg" key={stat.quizId}>
                  <TableCell>{stat.scorePercentage}</TableCell>
                  <TableCell>{stat.name}</TableCell>
                  <TableCell>{stat.email}</TableCell>
                  <TableCell>
                    {stat.stat === "Stopped" && (
                      <StatusChip status={"Stopped"}></StatusChip>
                    )}
                    {stat.stat === "Finished" && (
                      <StatusChip status={"Finished"}></StatusChip>
                    )}
                  </TableCell>
                  <TableCell className="text-center md:text-start">
                    {stat.time}
                  </TableCell>
                  <TableCell>{stat.date}</TableCell>
                  <TableCell>
                    <DetailsButton />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </NavbarContentContainer>
      <ChartModal finishedQuiz={stats} />
    </motion.div>
  );
}

export default Statistics;
