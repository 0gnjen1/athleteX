import { IsNotEmpty, MaxLength } from "class-validator";


export class CreateInjuryDto {

    @IsNotEmpty()
    @MaxLength(32)
    type: string;

}