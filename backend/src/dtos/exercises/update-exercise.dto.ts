import { PickType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateExerciseDto extends PickType(CreateExerciseDto, ['type'] as const) {}
