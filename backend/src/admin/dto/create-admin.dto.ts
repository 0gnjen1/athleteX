import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @IsString()
    key: string;

}
