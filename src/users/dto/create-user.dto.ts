import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  /**
   * The username of the user
   * @example John Doe
   */
  @ApiProperty({
    description: 'The username of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  /**
   * The password of the user
   * @example secret
   */
  @ApiProperty({
    description: 'The password of the user',
    example: 'secret',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  password: string;
}
