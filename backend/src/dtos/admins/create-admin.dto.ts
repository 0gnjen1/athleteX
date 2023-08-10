import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAdminDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    name: string;
    
    @IsEmail()
    @MaxLength(32)
    email: string;

    @MinLength(8)
    password: string;

    @IsString()
    key: string;

}
