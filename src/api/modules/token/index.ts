import HttpHelper from '@/api/HttpHelper';
import type { IHttpApiResponse } from '@/api/types';
import type { CreateTokenRequestV1, CreateTokenResponseV1 } from './types';

const Api = {
  v1: {
    create: '/v1/token/create',
  },
};

const token = {
  create: function (params: CreateTokenRequestV1): Promise<IHttpApiResponse<CreateTokenResponseV1>> {
    return HttpHelper.postJson(Api.v1.create, params, false);
  },
};

export default token;
