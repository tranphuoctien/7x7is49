import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization;
  
    if (!authHeaders || !(authHeaders as string).split(' ')[1]) {
      throw new HttpException(
        {
          message: null,
          data: null,
          errors: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = (authHeaders as string).split(' ')[1];
    const userTokenInfo = await this.tokenServiceClient
      .send('token_decode', {
        token: token,
      }).toPromise();

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null,
        },
        userTokenInfo.status,
      );
    }

    const userInfo = await this.userServiceClient
      .send('user_get_by_id', userTokenInfo.data.userId)
      .toPromise();

    request.user = userInfo.user;
    return true;
  }
}
