import { Catch, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

const DEFAULT_ERR_CODE = 400;

@Catch()
export class DefaultErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    const status = err.status ?? DEFAULT_ERR_CODE;
    ctx.logger.error(err);
    ctx.status = status;
    // 所有的未分类错误会到这里
    return {
      status,
      success: false,
      message: err.message,
    };
  }
}
