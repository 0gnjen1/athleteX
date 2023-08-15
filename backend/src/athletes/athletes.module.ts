import { Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthletesController } from './athletes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [
        AthletesController
    ],
    providers: [
        AthletesService
    ],
    imports: [
        PrismaModule
    ]
})
export class AthletesModule {}
