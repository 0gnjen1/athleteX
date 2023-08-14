import { IsAlpha, IsNotEmpty } from "class-validator";


export class CreateInjuryDto {

    @IsNotEmpty()
    @IsAlpha()
    type: string;

}