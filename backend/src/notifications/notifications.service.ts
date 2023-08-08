import { BadRequestException, Injectable } from '@nestjs/common';
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
        return this.prisma.notifications.create({
            data: {
                title: title,
                content: content,
                coach_id: coachId
            }
        });
    }

    async findAll(coachId: number, page: number, pgsize: number) {
        
    }

    async findOne(coachId: number, notificationId: number) {
        
    }

    async update(coachId: number, notificationId: number, updateNotificationDto: UpdateNotificationDto) {
        
    }

    async remove(coachId: number, notificationId: number) {
        
    }
    
}
