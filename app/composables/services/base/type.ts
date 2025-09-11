export type PaginatedContent<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type ApiResponseProps<T> = {
  status: string;
  message: string;
  content: PaginatedContent<T>;
  errors: any[];
};
