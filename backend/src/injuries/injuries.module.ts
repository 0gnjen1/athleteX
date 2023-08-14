import { Module } from '@nestjs/common';
import { InjuriesController } from './injuries.controller';
import { InjuriesService } from './injuries.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [
        InjuriesController
    ],
    providers: [
        InjuriesService
    ],
    imports: [
        PrismaModule
    ]
})
export class InjuriesModule {}
