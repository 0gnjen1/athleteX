import { Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthletesController } from './athletes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers:  [AthletesController],
  providers:    [AthletesService,
                  PrismaService]
})
export class AthletesModule {}
