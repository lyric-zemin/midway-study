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
import { PhotoDTO, NewPhotoDto } from '../dto/photo';

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
  async findPhotos() {
    // find and get count
    const [list, count] = await this.photoModel.findAndCount();

    return {
      list,
      count,
    };
  }
}
