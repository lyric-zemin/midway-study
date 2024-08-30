import { BaseService } from '@cool-midway/core';
import { Init, Inject } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { BaseEntity } from '../entity/base.entity';

export abstract class BaseController<T extends BaseEntity = BaseEntity> {
  @Inject()
  service: BaseService;

  abstract entity: Repository<T>;

  @Init()
  init() {
    this.service.setEntity(this.entity);
  }
}
