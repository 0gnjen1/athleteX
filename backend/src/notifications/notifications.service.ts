import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationsService {

    constructor(private prisma: PrismaService){}

    async create(createNotificationDto: CreateNotificationDto, userType: string, userId: number) {
        if(userType !== "coach") return new UnauthorizedException();
        return await this.prisma.notifications.create({
            data: {
                title: createNotificationDto.title,
                content: createNotificationDto.content,
                coach_id: userId
            }
        });
    }

    async findAll(userType: string, userId: number, page: number, pgsize: number) {
        if(userType === "admin"){
            return this.prisma.notifications.findMany({
                skip: (page-1)*pgsize,
                take: pgsize,
                select: {
                    id: true,
                    title: true,
                    coach_id: true
                }
            });
        }
        if(userType === "coach"){
            return this.prisma.notifications.findMany({
                skip: (page-1)*pgsize,
                take: pgsize,
                select: {
                    id: true,
                    title: true,
                    coach_id: true
                },
                where: {
                    coach_id: userId
                }
            });
        }
        if(userType === "athlete"){
            let athlete = await this.prisma.athlete.findUnique({
                select: {
                    coach_id: true
                },
                where: {
                    id: userId
                }
            }); 
            return this.prisma.notifications.findMany({
                skip: (page-1)*pgsize,
                take: pgsize,
                select: {
                    id: true,
                    title: true,
                    coach_id: true
                },
                where: {
                    coach_id: athlete.coach_id
                }
            });
        }
        throw new UnauthorizedException();
    }

    async findOne(userType: string, userId: number, queryId: number) {
        if(userType === "admin"){
            return this.prisma.notifications.findUnique({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    coach_id: true
                },
                where: {
                    id: queryId
                }
            });
        }
        if(userType === "coach"){
            return this.prisma.notifications.findUnique({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    coach_id: true
                },
                where: {
                    id: queryId
                }
            });
        }
        if(userType === "athlete"){
            let athlete = await this.prisma.athlete.findUnique({
                select: {
                    coach_id: true
                },
                where: {
                    id: userId
                }
            });
            let notification = await this.prisma.notifications.findUnique({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    coach_id: true
                },
                where: {
                    id: queryId
                }
            });
            if(athlete.coach_id === notification.coach_id) return notification;
        }
        throw new UnauthorizedException();
    }

    update(id: number, updateNotificationDto: UpdateNotificationDto) {
        return `This action updates a #${id} notification`;
    }

    remove(id: number) {
        return `This action removes a #${id} notification`;
    }
    
}
