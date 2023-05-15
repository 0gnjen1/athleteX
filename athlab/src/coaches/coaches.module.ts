import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CoachesController } from './coaches.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CoachesController],
  providers: [CoachesService, PrismaService]
})
export class CoachesModule {}
