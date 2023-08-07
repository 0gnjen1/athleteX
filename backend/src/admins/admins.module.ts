import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers:  [AdminsController],
    providers:    [AdminsService],
    imports:      [PrismaModule]
})
export class AdminsModule {}
