import { PickType } from '@nestjs/mapped-types';
import { CreateInjuryDto } from './create-injury.dto';

export class UpdateInjuryDto extends PickType(CreateInjuryDto, ['type'] as const) {}
