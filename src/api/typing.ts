export interface Response {
  data?: any;
  code: number;
}

export interface TableResponse {
  data?: any;
  code: number;
  total: number;
  pageIndex: number;
  pageSize: number;
}
