/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IHttpApiResponse } from '@/api/types';
import type { IMockParam } from '../types';

const apis: IMockParam[] = [
  {
    url: '/v1/token/create',
    method: 'post',
    response: function (option?: Record<string, unknown>): IHttpApiResponse<any> {
      return {
        requestId: '1',
        code: 200,
        message: '成功',
        data: {
          access_token: '1234',
          token_type: 'bearer',
          refresh_token: '23456',
          expires_in: 2000,
          openid: 20000123,
        },
      };
    },
  },
];

export default apis;
