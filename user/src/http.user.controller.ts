import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Req,
  Inject,
  HttpStatus,
  HttpException,
  Param,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { IUser } from './interfaces/user.interface';
import { IUserCreateResponse } from './interfaces/user-create-response.interface';
import { IUserSearchResponse } from './interfaces/user-search-response.interface';

@Controller('user')
export class HTTPUserController {
  constructor(
    private readonly userService: UserService,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
  ) { }

  @Get(':id')
  public async getUserById(@Param() params): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse;
    const id = params.id;
    try{
      if (id) {
        const user = await this.userService.searchUserById(id);
        if (user) {
          result = {
            status: HttpStatus.OK,
            message: 'user_get_by_id_success',
            user,
          };
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'user_get_by_id_not_found',
            user: null,
          };
        }
      } else {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'user_get_by_id_bad_request',
          user: null,
        };
      }
    } catch(e){
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: e.errors,
        user: null,
      };
    }
    
    return result;
  }

  @Post()
  public async createUser(@Body() userParams: IUser): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse;

    if (userParams) {
      const usersWithEmail = await this.userService.searchUser({
        email: userParams.email,
      });

      if (usersWithEmail && usersWithEmail.length > 0) {
        result = {
          status: HttpStatus.CONFLICT,
          message: 'user_create_conflict',
          user: null,
          token: null,
          errors: {
            email: {
              message: 'Email already exists',
              path: 'email',
            },
          },
        };
      } else {
        try {
          userParams.is_confirmed = false;
          const createdUser = await this.userService.createUser(userParams);
          delete createdUser.password;
          // add metadata
          createdUser.metadata = {
            jwt: null
          };

          const jwt = await this.tokenServiceClient.send('token_create', {
            userId: createdUser.id,
          }).toPromise();
          console.log('user_create_success >>> ', jwt);

          result = {
            status: HttpStatus.CREATED,
            message: 'user_create_success',
            user: createdUser,
            token: jwt.token,
            errors: null,
          };

        } catch (e) {
          console.log('user_create_precondition_failed >>> ', e);
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'user_create_precondition_failed',
            user: null,
            token: null,
            errors: e.errors,
          };
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_create_bad_request',
        user: null,
        token: null,
        errors: null,
      };
    }

    return result;
  }
}
