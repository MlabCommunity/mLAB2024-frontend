import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useState } from "react";
import {
  QuizDetailsT,
  ParticipantsT,
} from "@/app/[locale]/(quiz-details)/types"; // Import the correct types
import { PaginatedResponse } from "@/types";

interface UsePaginatedStatisticsOptions {
  queryKey: any[];
  fetch: (
    quizId: string,
    page: number,
    pageSize: number
  ) => Promise<QuizDetailsT>;
  quizId: string;
  pageSize: number;
}

function usePaginatedStatistics(
  options: UsePaginatedStatisticsOptions,
  queryOptions?: Omit<
    UseQueryOptions<QuizDetailsT, Error>,
    "queryKey" | "queryFn"
  >
) {
  const [page, setPage] = useState(1); // Manage pagination state
  const { queryKey, fetch, quizId, pageSize } = options;

  // Use react-query's useQuery to fetch the data
  const query = useQuery<QuizDetailsT, Error>({
    queryKey: [...queryKey, quizId, page], // Append page number for dynamic queries
    queryFn: () => fetch(quizId, page, pageSize), // Fetch data using provided fetch function
    ...queryOptions,
  });

  // Extract participants (paginated data) and quiz details from the response
  const paginatedData = query.data?.participants; // Default to empty if no data
  const quizDetails = query.data; // Full quiz details (QuizDetailsT)
  const count = paginatedData?.totalItemsCount ?? 0; // Get the total count of participants
  const pages = Math.ceil(count / pageSize); // Calculate total pages

  return {
    paginatedData, // Participant data (paginated)
    quizDetails, // Full quiz details
    page, // Current page number
    setPage, // Setter to update the current page
    pages, // Total number of pages
    count, // Total participant count
    ...query, // Other query-related data (isLoading, isError, etc.)
  };
}

export default usePaginatedStatistics;
