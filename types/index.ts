export type GenerateQuizT = {
  Content?: string;
  NumberOfQuestions?: number;
  QuestionTypes?: string[];
  Attachments?: File[];
};

export type PaginatedResponse<T> = {
  count: number;
  items: T[];
};
export type UserPaginatorOptions = {
  queryKey: string[];
  fetch: <T>(page: number, limit: number) => Promise<PaginatedResponse<T>>;
  pageSize: number;
};
