import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { UserDto } from '../dto/user.dto';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';

@Controller('/login')
export class LoginController {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Post()
  async login(@Body() user: UserDto) {
    const userObj = await this.userModel.findOne({
      where: {
        account: user.account,
        password: user.password,
      },
    });

    if (!userObj) {
      throw new Error('账号或密码错误');
    }

    return this.jwt.sign({ user: userObj });
  }

  @Post('/out')
  async logout() {
    // console.log('jwt user: ', this.ctx.state.user);
    return this.ctx.state.user;
  }
}
