import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
