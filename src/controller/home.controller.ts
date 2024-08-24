import { CaptchaService } from '@midwayjs/captcha';
import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { RedisService } from '@midwayjs/redis';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@midwayjs/swagger';
import { Context } from 'koa';

@Controller('/')
export class HomeController {
  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Inject()
  captchaService: CaptchaService;

  @Get('/')
  @ApiQuery({ name: 'name' })
  async home(@Query('name') name = 'Midwayjs') {
    // return 'Hello Midwayjs!';
    return 'Hello ' + name + '!';
  }

  @Get('/token')
  async getToken() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }

  @Get('/login')
  async render() {
    const captchaInfo = await this.getImageCaptcha();
    await this.ctx.render('login.nj', { captchaInfo });
  }

  @Inject()
  redisService: RedisService;

  @Get('/redis')
  @ApiOperation({ summary: '查询redis' })
  @ApiOkResponse({ description: '查询redis返回值', type: 'string' })
  async getRedis() {
    const result = await this.redisService.get('foo');
    await this.redisService.set('foo', 'bar2', 'EX', 10);

    return result;
  }

  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.formula({ noise: 1 });
    return {
      id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }
}
