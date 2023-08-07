import { PickType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PickType(CreateAdminDto, ['name'] as const) {}
