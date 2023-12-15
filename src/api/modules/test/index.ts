import HttpHelper from '@/api/HttpHelper';
import type { IHttpApiResponse } from '@/api/types';
import type { CreateRequestV1, CreateResponseV1 } from './types';

const Api = {
  v1: {
    create: '/v1/test/create',
  },
};

const test = {
  create: function (params: CreateRequestV1): Promise<IHttpApiResponse<CreateResponseV1>> {
    return HttpHelper.postJson(Api.v1.create, params, true);
  },
};

export default test;
