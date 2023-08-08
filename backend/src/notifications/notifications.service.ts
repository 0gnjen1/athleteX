import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateNotificationDto } from '../dtos/notifications/update-notification.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {

    constructor(private prisma: PrismaService){}

    async create(coachId: number, title: string, content: string) {
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
                coach_id: coachId
            }
        });
    }

    async findAll(coachId: number, page: number, pgsize: number) {
        const coach = await this.prisma.coach.findUnique({
            where: {
                id: coachId
            },
            select: {
                id: true
            }
        });
        if(coach === null) throw new NotFoundException();
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

    async findOne(coachId: number, notificationId: number) {
        const coach = await this.prisma.coach.findUnique({
            where: {
                id: coachId
            },
            select: {
                id: true
            }
        });
        if(coach === null) throw new NotFoundException();
        const notification = await this.prisma.notifications.findUnique({
            select: {
                id: true,
                title: true,
                content: true,
                coach_id: true
            },
            where: {
                id: notificationId
            }
        });
        if(notification === null) throw new NotFoundException();
        return notification;
    }

    async update(coachId: number, notificationId: number, updateNotificationDto: UpdateNotificationDto) {
        const coach = await this.prisma.coach.findUnique({
            where: {
                id: coachId
            },
            select: {
                id: true
            }
        });
        if(coach === null) throw new BadRequestException();
        const notification  = await this.prisma.notifications.findUnique({
            select: {
                coach_id: true
            },
            where: {
                id: notificationId
            }
        });
        if(notification === null) throw new BadRequestException();
        if(coachId !== notification.coach_id) throw new UnauthorizedException();
        return await this.prisma.notifications.update({
            data: updateNotificationDto,
            where: {
                id: notificationId
            }
        });
    }

    async remove(coachId: number, notificationId: number) {
        const coach = await this.prisma.coach.findUnique({
            where: {
                id: coachId
            },
            select: {
                id: true
            }
        });
        if(coach === null) throw new BadRequestException();
        const notification  = await this.prisma.notifications.findUnique({
            select: {
                coach_id: true
            },
            where: {
                id: notificationId
            }
        });
        if(notification === null) throw new BadRequestException();
        if(coachId !== notification.coach_id) throw new UnauthorizedException();
        await this.prisma.notifications.delete({
            where: {
                id: notificationId
            }
        });
        return;
    }
    
    async removeAll(coachId: number) {
        await this.prisma.notifications.deleteMany({
            where: {
              coach_id: coachId
            },
        });
        return;
    }

}
