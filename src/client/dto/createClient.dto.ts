import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
