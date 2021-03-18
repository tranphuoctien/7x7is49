import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../user.interface';

export class CreateUserResponseDto {
  @ApiProperty({ example: 'user_create_success' })
  message: string;
  @ApiProperty({
    example: {
      user: {
        email: 'tientp@floware.net',
        is_confirmed: false,
        id: '6053080c50f4ba22b5473ee2',
      },
      token: 'supper jwt'
    },
    nullable: true,
  })
  data: {
    user: IUser;
    token: string
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
