export type DashboardQuizItemT = {
  id: string;
  title: string;
  description: string;
  availability: "Public" | "Private";
  status: "Active" | "Inactive";
  totalQuestions: number;
  url?: string;
};

export type DashboardQuizT = {
  items: DashboardQuizItemT[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
};
