import { Body, Controller, Del, Get, Post, Put, Query } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto, UpdateUserDto } from '../dto/user.dto';
import { RuleType, Valid } from '@midwayjs/validate';
import { Pagination } from '../interface';

@Controller('/user')
export class UserController {
  @InjectEntityModel(User)
  private userModel: Repository<User>;

  @Post()
  async addUser(@Body() user: AddUserDto) {
    return this.userModel.save(user);
  }

  @Del()
  async delUser(@Body('id') id: UpdateUserDto['id']) {
    if (!(await this.getUser(id))) {
      throw new Error('user not found');
    }
    return this.userModel.delete(id);
  }

  @Put()
  async updateUser(@Body() user: UpdateUserDto) {
    if (!(await this.getUser(user.id))) {
      throw new Error('user not found');
    }
    return this.userModel.save(user);
  }

  @Get()
  async getUser(
    @Valid(RuleType.number().required().error(new Error('id is required')))
    @Query('id')
    id: UpdateUserDto['id']
  ) {
    return this.userModel.findOne({ where: { id }, relations: ['role'] });
  }

  @Get('/all')
  async getAllUser(@Query() pagination: Pagination) {
    const { page = 1, size = 10 } = pagination;
    return this.userModel.find({
      skip: (page - 1) * size,
      take: size,
      relations: ['role'],
    });
  }

  @Del('/all')
  async delAllUser() {
    return this.userModel.clear();
  }
}
