import {
  CustomStrategy,
  PassportStrategy,
  PassportMiddleware,
  AuthenticateOptions,
} from '@midwayjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Middleware, Config } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Config('jwt')
  jwtConfig;

  // 策略的验证
  async validate(payload) {
    return payload.user;
  }

  getStrategyOptions() {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }
}

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }

  match(ctx: Context) {
    // 忽略登录接口
    return !ctx.path.includes('/login/in');
  }
}
