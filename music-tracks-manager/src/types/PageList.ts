export interface PageList<T> {
  data: T[];
  meta: PageData;
}

export interface PageData {
  total: number; 
  page: number;
  limit: number;
  totalPages: number;
}
