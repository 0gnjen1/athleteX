import { IsAlpha, IsEmail, IsString, MinLength } from "class-validator";

export class CreateAdminDto {

    @IsAlpha()
    name: string;
    
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @IsString()
    key: string;

}
