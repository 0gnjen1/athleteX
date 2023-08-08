import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers:  [NotificationsService],
    imports:    [PrismaModule],
    exports:    [NotificationsService]
})
export class NotificationsModule {}
