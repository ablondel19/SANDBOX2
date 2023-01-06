import { IsNotEmpty, IsString, NotContains } from 'class-validator';

export class SignDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @NotContains(' ')
  password: string;
}
