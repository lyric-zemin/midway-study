/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface Pagination {
  page?: number;
  size?: number;
}

// swagger泛型返回数据

import { ApiProperty, Type } from '@midwayjs/swagger';

type Res<T> = {
  code: number;
  msg: string;
  data: T;
};

export function SuccessWrapper<T>(ResourceCls?: T): Type<Res<T>> {
  class Succeed {
    @ApiProperty({ description: '错误码' })
    code: number;

    @ApiProperty({ description: '错误信息' })
    msg: string;

    @ApiProperty({ type: ResourceCls })
    data: T;
  }

  return Succeed;
}
