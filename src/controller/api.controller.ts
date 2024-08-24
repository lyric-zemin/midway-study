import {
  Inject,
  Controller,
  Get,
  Query,
  Post,
  Body,
  Del,
  Param,
  Put,
  HttpStatus,
  MidwayHttpError,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../entity/photo.entity';
import { PhotoDTO, NewPhotoDto } from '../dto/photo.dto';
import { Pagination } from '../interface';
import {
  AuthActionVerb,
  AuthPossession,
  UsePermission,
} from '@midwayjs/casbin';
import { RedisService } from '@midwayjs/redis';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Photo)
  photoModel: Repository<Photo>;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/clear_photo')
  async clearPhoto() {
    await this.photoModel.clear();

    return '清除成功';
  }

  // 增
  @Post('/photo')
  async savePhoto(@Body() photo: NewPhotoDto) {
    // save entity
    const photoResult = await this.photoModel.save(photo);

    return photoResult.id;
  }
  // 删
  @Del('/photo/:id')
  async deletePhoto(@Param('id') id: number) {
    await this.photoModel.delete(id);
    return id;
  }
  // 改
  @Put('/photo')
  async updatePhoto(@Body() photo: PhotoDTO) {
    if (!(await this.photoModel.findOneBy({ id: photo.id }))) {
      throw new MidwayHttpError('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const photoResult = await this.photoModel.save(photo);

    return photoResult.id;
  }
  // 查
  @Get('/photo')
  @UsePermission({
    resource: 'user',
    action: AuthActionVerb.READ,
    possession: AuthPossession.ANY,
  })
  async findPhotos(@Query() pagination: Pagination) {
    const { page = 1, size = 10 } = pagination;
    // find and get count
    const [list, count] = await this.photoModel.findAndCount({
      // relations: ['metaData', 'author', 'albums'],
      order: { updateDate: 'desc' },
      skip: size * (page - 1),
      take: size,
    });

    return {
      list,
      count,
      page,
      size,
    };
  }

  @Inject()
  redisService: RedisService;

  @Get('/redis')
  async getRedis() {
    const result = await this.redisService.get('foo');
    // await this.redisService.set('foo', 'bar2', 'EX', 10);

    return result;
  }
}
