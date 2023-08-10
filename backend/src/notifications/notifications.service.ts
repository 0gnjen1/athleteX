import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateNotificationDto } from '../dtos/notifications/update-notification.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {

    constructor(private prisma: PrismaService){}

    async findAllNotifications(
        coachId: number,
        page: number,
        pgsize: number
    ) {
        return await this.prisma.notifications.findMany({
            skip: (page-1)*pgsize,
            take: pgsize,
            select: {
                id: true,
                title: true,
                content: true,
                coach_id: true
            },
            where: {
                coach_id: coachId
            }
        });
    }

    async findOneNotification(
        coachId: number,
        notificationId: number
    ) {
        const notification = await this.prisma.$queryRaw`
            SELECT *
            FROM Notifications
            WHERE id = ${notificationId}
            AND coach_id = ${coachId}
            LIMIT 1
        `;
        if(notification[0] === undefined) throw new NotFoundException();
        return notification;
    }

    async createNotification(
        coachId: number,
        title: string,
        content: string
    ) {
        const coach = await this.prisma.coach.findUnique({
            where: {
                id: coachId
            },
            select: {
                id: true
            }
        });
        if(coach === null) throw new BadRequestException();
        return await this.prisma.notifications.create({
            data: {
                title: title,
                content: content,
                coach: {
                    connect: {
                        id: coachId
                    }
                }
            }
        });
    }

    async updateNotification(
        coachId: number,
        notificationId: number,
        updateNotificationDto: UpdateNotificationDto
    ) {
        const notification = await this.prisma.$queryRaw`
            SELECT *
            FROM Notifications
            WHERE id = ${notificationId}
            AND coach_id = ${coachId}
            LIMIT 1
        `;
        if(notification[0] === undefined) throw new BadRequestException();
        return await this.prisma.notifications.update({
            data: updateNotificationDto,
            where: {
                id: notificationId
            }
        });
    }

    async removeNotification(
        coachId: number,
        notificationId: number
    ) {
        const notification = await this.prisma.$queryRaw`
            SELECT *
            FROM Notifications
            WHERE id = ${notificationId}
            AND coach_id = ${coachId}
            LIMIT 1
        `;
        if(notification[0] === undefined) throw new NotFoundException();
        await this.prisma.notifications.delete({
            where: {
                id: notificationId
            }
        });
        return;
    }
    
    async removeAllNotification(
        coachId: number
    ) {
        await this.prisma.notifications.deleteMany({
            where: {
              coach_id: coachId
            },
        });
        return;
    }

}
