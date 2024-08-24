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
import { UserService } from '../service/user.service';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../entity/photo.entity';
import { PhotoDTO, NewPhotoDto } from '../dto/photo';
import { Pagination, SuccessWrapper } from '../interface';
import {
  AuthActionVerb,
  AuthPossession,
  UsePermission,
} from '@midwayjs/casbin';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@midwayjs/swagger';

@ApiBearerAuth()
@ApiTags(['photo'])
@Controller('/api')
export class APIController {
  @InjectEntityModel(Photo)
  photoModel: Repository<Photo>;

  // 增
  @Post('/photo')
  @ApiOperation({ summary: '增' })
  async savePhoto(@Body() photo: NewPhotoDto) {
    // save entity
    const photoResult = await this.photoModel.save(photo);

    return photoResult.id;
  }
  // 删
  @Del('/photo/:id')
  @ApiOperation({ summary: '删' })
  async deletePhoto(@Param('id') id: number) {
    await this.photoModel.delete(id);
    return id;
  }
  // 改
  @Put('/photo')
  @ApiOperation({ summary: '改' })
  async updatePhoto(@Body() photo: PhotoDTO) {
    if (!(await this.photoModel.findOneBy({ id: photo.id }))) {
      throw new MidwayHttpError('图片不存在', HttpStatus.BAD_REQUEST);
    }
    const photoResult = await this.photoModel.save(photo);

    return photoResult.id;
  }
  // 查
  @Get('/photo')
  @ApiOperation({ summary: '查' })
  @ApiResponse({ type: SuccessWrapper(PhotoDTO) }) // hack 解决返回类型问题
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

  @Del('/clear_photo')
  @ApiOperation({ summary: '清空图片列表' })
  async clearPhoto() {
    await this.photoModel.clear();

    return '清除成功';
  }

  @Inject()
  userService: UserService;

  @Get('/get_user')
  @ApiOperation({ tags: ['user'], summary: '根据用户id 获取用户信息' })
  async getUser(@Query('uid') uid: number) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
}
