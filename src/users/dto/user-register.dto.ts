import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
  @IsEmail({}, {message: 'Неверно указан email'})
  name: string;
  @IsString({message: 'Не указан пароль'})
  email: string;
  @IsString({message: 'Не указано имя'})
  password: string;
}