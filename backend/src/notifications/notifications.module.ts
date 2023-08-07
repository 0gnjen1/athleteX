import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers:  [NotificationsController],
    providers:    [NotificationsService],
    imports:      [PrismaModule]
})
export class NotificationsModule {}
