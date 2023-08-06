import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAthleteDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

}
