import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'tientp@floware.net' })
  email: string;
  @ApiProperty({ example: 'nest.microservice' })
  password: string;
}
