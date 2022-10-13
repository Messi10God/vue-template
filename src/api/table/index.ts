import { TableResponse } from '@/api/typing';
import request from '@/utils/request';

export function getUsers(params: any): Promise<TableResponse> {
  return request.get('/getUsers', { params });
}
