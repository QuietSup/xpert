import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(4)
  password: string;

  @MinLength(4)
  username: string;
}
