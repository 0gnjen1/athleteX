import { IsAlpha, IsNotEmpty, MaxLength } from "class-validator";


export class CreateInjuryDto {

    @IsNotEmpty()
    @MaxLength(128)
    type: string;

}