import { Body, Controller, Del, Get, Post, Put, Query } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Role } from '../entity/role.entity';
import { Repository } from 'typeorm';
import { AddRoleDto, UpdateRoleDto } from '../dto/role.dto';
import { RuleType, Valid } from '@midwayjs/validate';
import { Pagination } from '../interface';

@Controller('/role')
export class RoleController {
  @InjectEntityModel(Role)
  private roleModel: Repository<Role>;

  @Post()
  async addRole(@Body() role: AddRoleDto) {
    return this.roleModel.save(role);
  }

  @Del()
  async delRole(@Body('id') id: UpdateRoleDto['id']) {
    if (!(await this.getRole(id))) {
      throw new Error('role not found');
    }
    return this.roleModel.delete(id);
  }

  @Put()
  async updateRole(@Body() role: UpdateRoleDto) {
    if (!(await this.getRole(role.id))) {
      throw new Error('role not found');
    }
    return this.roleModel.save(role);
  }

  @Get()
  async getRole(
    @Valid(RuleType.number().required().error(new Error('id is required')))
    @Query('id')
    id: UpdateRoleDto['id']
  ) {
    return this.roleModel.findOne({ where: { id } });
  }

  @Get('/all')
  async getAllRole(@Query() pagination: Pagination) {
    const { page = 1, size = 10 } = pagination;
    return this.roleModel.find({
      skip: (page - 1) * size,
      take: size,
      // relations: ['users'],
    });
  }

  @Del('/all')
  async delAllRole() {
    return this.roleModel.clear();
  }
}
