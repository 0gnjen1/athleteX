import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CoachesController } from './coaches.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
    controllers: [
        CoachesController
    ],
    providers: [
        CoachesService
    ],
    imports: [
        PrismaModule,
        NotificationsModule
    ]
})
export class CoachesModule {}
