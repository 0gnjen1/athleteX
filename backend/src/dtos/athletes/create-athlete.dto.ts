import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAthleteDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    name: string;

    @IsEmail()
    @MaxLength(32)
    email: string;

    @MinLength(8)
    password: string;

}
