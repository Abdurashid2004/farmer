import { IsString, IsStrongPassword } from 'class-validator';

export class LoginWorkerDto {
  @IsString()
  email: string;

  @IsString()
//   @IsStrongPassword()
  password: string;
}
