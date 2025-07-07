import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  message: string;
}
