import {
  WSController,
  OnWSConnection,
  Inject,
  OnWSMessage,
  OnWSDisConnection,
  WSBroadCast,
} from '@midwayjs/core';
import { Context } from '@midwayjs/ws';

@WSController()
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @OnWSConnection()
  async onConnectionMethod() {
    // console.log(`namespace / got a connection ${this.ctx.readyState}`);
  }

  @OnWSDisConnection()
  async disconnect(id: number) {
    // console.log('disconnect ' + id);
  }

  @OnWSMessage('message')
  @WSBroadCast()
  async onWSMessage(data) {
    return 'Hello Client!';
  }
}
