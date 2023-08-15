import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateExerciseDto {

    @IsNotEmpty()
    @MaxLength(32)
    type: string;

}
