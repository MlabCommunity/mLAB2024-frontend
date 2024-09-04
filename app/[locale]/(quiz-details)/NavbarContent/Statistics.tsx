"use client";
import React from "react";
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
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";

function Statistics() {
  const date = new Date();
  const formatedDate = format(date, "dd.MM.yyyy");
  const t = useTranslations("QuestionsOnAnswers");
  const finishedQuizzes = [
    {
      quizId: 1,
      score: 40,
      name: "Random",
      email: "user@example.com",
      stat: "Finished",
      time: <EventDuration durationInSeconds={136} />,
      date: formatedDate,
    },
    {
      quizId: 2,
      score: 40,
      name: "Random",
      email: "user@example.com",
      stat: "Stopped",
      time: <EventDuration durationInSeconds={240} />,
      date: formatedDate,
    },
    {
      quizId: 3,
      score: 40,
      name: "Random",
      email: "user@example.com",
      stat: "Stopped",
      time: <EventDuration durationInSeconds={30} />,
      date: formatedDate,
    },
    {
      quizId: 4,
      score: 40,
      name: "Random",
      email: "user@example.com",
      stat: "Finished",
      time: <EventDuration durationInSeconds={140} />,
      date: formatedDate,
    },
    {
      quizId: 5,
      score: 40,
      name: "Random",
      email: "user@example.com",
      stat: "Finished",
      time: <EventDuration durationInSeconds={3600} />,
      date: formatedDate,
    },
  ];
  const tableHeaders = [
    t("scoreTableHeader"),
    t("nameTableHeader"),
    "E-mail",
    "Status",
    t("timeTableHeader"),
    t("dateTableHeader"),
    t("detailsTableHeader"),
  ];
  return (
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
          {finishedQuizzes.map((finishedQuizz) => (
            <TableRow
              className="bg-white rounded-lg"
              key={finishedQuizz.quizId}
            >
              <TableCell>{finishedQuizz.score}</TableCell>
              <TableCell>{finishedQuizz.name}</TableCell>
              <TableCell>{finishedQuizz.email}</TableCell>
              <TableCell>
                {finishedQuizz.stat === "Stopped" && (
                  <StatusChip status={"Stopped"}></StatusChip>
                )}
                {finishedQuizz.stat === "Finished" && (
                  <StatusChip status={"Finished"}></StatusChip>
                )}
              </TableCell>
              <TableCell className="text-center md:text-start">
                {finishedQuizz.time}
              </TableCell>
              <TableCell>{finishedQuizz.date}</TableCell>
              <TableCell>
                <DetailsButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </NavbarContentContainer>
  );
}

export default Statistics;
