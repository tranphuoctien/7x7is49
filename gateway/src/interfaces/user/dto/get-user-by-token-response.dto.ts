import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../user.interface';

export class GetUserByTokenResponseDto {
  @ApiProperty({ example: 'user_get_by_id_success' })
  message: string;
  @ApiProperty({
    example: {
      user: {
        email: 'tientp@floware.net',
        is_confirmed: false,
        id: '6053080c50f4ba22b5473ee2'
      },
      token: 'supper token'
    },
    nullable: true,
  })
  data: {
    user: IUser;
    token: 'supper token'
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
