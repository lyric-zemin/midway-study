import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { Clients } from '@midwayjs/grpc';
import { JwtService } from '@midwayjs/jwt';
import { helloworld } from '../domain/helloworld';

@Controller('/')
export class HomeController {
  @Inject()
  jwt: JwtService;

  @Inject()
  grpcClients: Clients;

  @Get('/')
  async home(@Query('name') name = 'Midwayjs'): Promise<helloworld.HelloReply> {
    // 获取服务
    const greeterService =
      this.grpcClients.getService<helloworld.GreeterClient>(
        'helloworld.Greeter'
      );

    // 调用服务
    const result = await greeterService.sayHello().sendMessage({
      name,
    });

    // 返回结果
    return result;
  }

  @Get('/token')
  async getToken() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }
}
