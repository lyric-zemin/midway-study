import { Catch, IFilter, MidwayHttpError, NextFunction } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { resError } from '../utils/response';

const DEFAULT_ERR_CODE = 400;

@Catch()
export class DefaultErrorFilter
  implements IFilter<Context, unknown, NextFunction>
{
  // 所有的未分类错误会到这里
  async catch(err: MidwayHttpError, ctx: Context) {
    const status = err.status ?? DEFAULT_ERR_CODE;
    ctx.logger.error(err);
    ctx.status = status < 600 ? status : DEFAULT_ERR_CODE;

    return resError(status, err.message);
  }
}
