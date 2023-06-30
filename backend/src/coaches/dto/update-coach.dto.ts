import { PickType } from '@nestjs/mapped-types';
import { CreateCoachDto } from './create-coach.dto';

export class UpdateCoachDto extends PickType(CreateCoachDto, ['name'] as const) {}
