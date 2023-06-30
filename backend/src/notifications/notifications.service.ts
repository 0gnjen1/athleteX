import { HttpCode, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationsService {

    constructor(private prisma: PrismaService){}

    async create(userType: string, userId: number, createNotificationDto: CreateNotificationDto) {
        if(userType !== "coach") throw new UnauthorizedException();
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
            if(athlete.coach_id === null) throw new NotFoundException();
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
            let notification = await this.prisma.notifications.findUnique({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    coach_id: true
                },
                where: {
                    id: queryId,
                }
            });
            if(userId === notification.coach_id) return notification;
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
            if(athlete.coach_id === null) throw new NotFoundException();
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

    async update(userType: string, userId: number, queryId: number, updateNotificationDto: UpdateNotificationDto) {
        if(userType === 'coach'){
            let notification = await this.prisma.notifications.findUnique({
                select: {
                    coach_id: true
                },
                where: {
                    id: queryId
                }
            });
            if(userId !== notification.coach_id) return new UnauthorizedException();
            return await this.prisma.notifications.update({
                where: {
                    id: queryId
                },
                data: {
                    title: updateNotificationDto.title,
                    content: updateNotificationDto.content,
                }
            });
        }
        throw new UnauthorizedException();
    }

    async remove(userType: string, userId:number, queryId: number) {
        if(userType === "admin"){
            await this.prisma.notifications.delete({
                where: {
                    id: queryId
                }
            });
            return "sucess"
        }
        if(userType === "coach"){
            let notification = await this.prisma.notifications.findUnique({
                select: {
                    coach_id: true
                },
                where: {
                    id: queryId
                }
            })
            if(userId === notification.coach_id){
                await this.prisma.notifications.delete({
                    where: {
                        id: queryId
                    }
                })
                return "sucess"
            }
        }
        throw new UnauthorizedException();
    }
    
}
