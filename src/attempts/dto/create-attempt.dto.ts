import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttemptDto {
  @ApiProperty({
    description: 'The email of the user who made the attempt',
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The content of the attempt',
    example: 'this is my first attempt',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Whether this attempt was triggered',
    example: false,
  })
  @IsBoolean()
  triggered: boolean;
}
