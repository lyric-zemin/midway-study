import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Controller('/')
export class HomeController {
  @Inject()
  jwt: JwtService;

  @Get('/')
  async home(@Query('name') name = 'Midwayjs'): Promise<string> {
    // return 'Hello Midwayjs!';
    return 'Hello ' + name + '!';
  }
  @Get('/token')
  async getToken() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }
}
