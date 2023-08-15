import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateExerciseDto {

    @IsNotEmpty()
    @MaxLength(128)
    type: string;

}
