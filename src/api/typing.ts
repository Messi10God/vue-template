export interface Response<T = any> {
  data?: T;
  message?: string;
  success: boolean;
}

export interface TableResponse<T = any> {
  data?: T;
  success: boolean;
  total: number;
  pageIndex: number;
  pageSize: number;
}
