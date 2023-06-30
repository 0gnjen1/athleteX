import { PickType } from '@nestjs/mapped-types';
import { CreateAthleteDto } from './create-athlete.dto';

export class UpdateAthleteDto extends PickType(CreateAthleteDto, ['name'] as const) {}
