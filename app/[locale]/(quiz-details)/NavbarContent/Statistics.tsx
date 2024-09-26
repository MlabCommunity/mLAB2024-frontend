import React, { Dispatch, SetStateAction } from "react";
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  Pagination,
  Skeleton,
} from "@nextui-org/react";
import StatusChip from "../components/statistics/StatusChip/StatusChip";
import {
  formatParticipationDate,
  formatParticipationTime,
} from "@/utils/helpers";
import { QuizDetail } from "@/types";
import { usePathname } from "next/navigation";
import usePaginatedStatistics from "@/utils/hooks/useDetailsStatistics";
import { getPaginatedResults } from "@/utils/actions/quiz/getPaginatedResults";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Participants } from "@/types";
import { ParticipantsT } from "../types";
import { pages } from "next/dist/build/templates/app-page";

function Statistics({
  participants,
  page,
  setPage,
  pages,
  isLoading,
  isFetching,
  isSuccess,
}: {
  participants: ParticipantsT;
  isLoading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isFetching: boolean;

  isSuccess: boolean;
  pages: number;
}) {
  const t = useTranslations("Dashboard");
  const tableHeaders = [
    { key: "score", label: t("scoreTableHeader") },
    { key: "name", label: t("nameTableHeader") },
    { key: "status", label: t("status") },
    { key: "time", label: t("timeTableHeader") },
    { key: "date", label: t("dateTableHeader") },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderCell = (participant: Participants, columnKey: React.Key) => {
    switch (columnKey) {
      case "score":
        return participant.score !== undefined && participant.score !== null
          ? `${participant.score}%`
          : "N/A";
      case "name":
        return participant.displayName;
      case "status":
        return <StatusChip status={participant.status} />;
      case "time":
        return formatParticipationTime(participant.participationDateUtc);
      case "date":
        return formatParticipationDate(participant.participationDateUtc);
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Table
          aria-label="Quiz "
          removeWrapper
          color="default"
          className="overflow-x-auto bg-content2 gap-6 p-6 rounded-lg w-full"
        >
          <TableHeader columns={tableHeaders}>
            {(column) => (
              <TableColumn key={column.key} className="uppercase">
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={participants.items}
            emptyContent={t("noQuizTakenDialogue")}
            loadingContent={
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header.key}>
                    <Skeleton className="w-full h-8 rounded-lg" />
                  </TableCell>
                ))}
              </TableRow>
            }
            loadingState={isLoading || isFetching ? "loading" : "idle"}
          >
            {(item) => (
              <TableRow key={item.displayName}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
      {isSuccess && participants ? (
        <Pagination
          className="flex justify-center w-full py-10"
          total={pages}
          initialPage={page || 1}
          page={page}
          onChange={handlePageChange}
          isDisabled={isLoading || isFetching}
        />
      ) : (
        <div className="flex justify-center w-full py-10">
          <Skeleton className="w-64 h-10 rounded-lg" />
        </div>
      )}
    </>
  );
}

export default Statistics;
