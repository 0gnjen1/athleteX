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
    @MaxLength(512)
    password: string;

    @IsString()
    @MaxLength(2048)
    key: string;

}
