import { CoolController } from '@cool-midway/core';
import { Cool } from '../entity/cool.entity';
import { Body, Del, Query } from '@midwayjs/core';
import { RuleType, Valid } from '@midwayjs/validate';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { BaseController } from './base.controller';
import { Pagination } from '../interface';
import { CoolDto } from '../dto/cool.dto';
import { Repository } from 'typeorm';

@CoolController({
  prefix: '/cool',
  entity: Cool,
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
})
export class CoolsController extends BaseController {
  @InjectEntityModel(Cool)
  entity: Repository<Cool>;

  async info(
    @Valid(RuleType.number().required().error(new Error('id不能为空')))
    @Query('id')
    id: number
  ) {
    const res = await this.service.info(id);
    if (!res) throw new Error('cool 不存在');
    return res;
  }

  async list() {
    return this.service.list({}, { select: ['id', 'refund'] });
  }

  async page(@Body() page: Pagination) {
    return this.service.page({ ...page }, {});
  }

  async add(@Body() cool: CoolDto) {
    return this.service.add(cool);
  }

  async update(@Body() cool: CoolDto) {
    // await this.info(cool.id);
    if (!(await this.entity.exist({ where: { id: cool.id } }))) {
      throw new Error('id 不存在');
    }
    return this.service.update(cool);
  }

  async delete(@Body('ids') ids: number[]) {
    return this.service.delete(ids);
  }

  @Del()
  async softDelete(@Body('ids') ids: number[]) {
    return this.entity.softDelete(ids);
  }
}
