import { CoolController, BaseController } from '@cool-midway/core';
import { Cool } from '../entity/cool.entity';

/**
 * 商品
 */
@CoolController({
  prefix: '/cool',
  entity: Cool,
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  listQueryOp: {
    // keyWordLikeFields: ['refundStatus'],
    fieldEq: ['refundStatus'],
  },
})
export class CoolsController extends BaseController {
  ok(data) {
    return data;
  }
}
