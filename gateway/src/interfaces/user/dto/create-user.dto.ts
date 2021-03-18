import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'tientp@floware.net',
  })
  email: string;
  @ApiProperty({
    minLength: 6,
    example: 'nest.microservice',
  })
  password: string;
}
