import type { IHttpApiResponse } from '@/api/types';

export interface IMockParam {
  url: string;
  method: string;
  response<T>(option?: Record<string, unknown>): IHttpApiResponse<T>;
}
