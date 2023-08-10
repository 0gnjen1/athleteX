import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateCoachDto } from '../dtos/coaches/update-coach.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateNotificationDto } from 'src/dtos/notifications/create-notification.dto';
import { UpdateNotificationDto } from 'src/dtos/notifications/update-notification.dto';

@Injectable()
export class CoachesService {

    constructor(
        private prisma: PrismaService,
        private notificationService: NotificationsService
    ){}

    async findAllCoaches(
        userType: string,
        userId: number,
        page: number,
        pgsize: number
    ) {
        if(userType === 'admin'){
            return await this.prisma.coach.findMany({
                skip: (page-1)*pgsize,
                take: pgsize,
                select: {
                    id: true,
                    name: true
                }
            });
        }
        if(userType === 'coach'){
            return await this.prisma.coach.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true
                }
            });
        }
        if(userType === 'athlete'){
            const athlete = await this.prisma.athlete.findUnique({
                where: {
                    id: userId
                },
                select: {
                    coach_id: true
                }
            });
            if(athlete.coach_id == null) throw new NotFoundException();
            return await this.prisma.coach.findUnique({
                where: {
                    id: athlete.coach_id
                },
                select: {
                    id: true,
                    name: true
                }
            });
        }
        throw new UnauthorizedException();
    }

    async findOneCoach(
        userType: string,
        userId: number,
        queryId: number
    ) {
        if(userType === 'admin' || (userType === 'coach' && userId === queryId)){
            const coach = await this.prisma.coach.findUnique({
                where:{
                    id: queryId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    athletes: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            if(coach === null) throw new NotFoundException();
            return coach;
        }
        if(userType === 'athlete'){
            const athlete = await this.prisma.athlete.findUnique({
                where: {
                    id: userId
                },
                select: {
                    coach_id: true
                }
            });
            if(athlete === null) throw new UnauthorizedException();
            if(athlete.coach_id !== queryId) throw new UnauthorizedException();
            const coach = await this.prisma.coach.findUnique({
                where: {
                    id: queryId
                },
                select: {
                    id: true,
                    name: true,
                }
            });
            if(coach === null) throw new NotFoundException();
            return coach;
        }
        throw new BadRequestException();
    }

    async updateCoach(
        userType: string,
        userId: number,
        queryId: number,
        updateCoachDto: UpdateCoachDto
    ) {
        if(userType === 'athlete') throw new UnauthorizedException();
        if(userType === 'coach' && userId !== queryId) throw new UnauthorizedException();
        const coach = await this.prisma.coach.findUnique({
            where: {
                id: queryId
            },
            select: {
                id:true
            }
        });
        if(coach === null) throw new NotFoundException();
        return await this.prisma.coach.update({
            where: {
                id: queryId
            },
            data: {
                name: updateCoachDto.name
            }
        });
    }

    async removeCoach(
        userType: string,
        userId: number,
        queryId: number
    ) {
        if(userType === 'athlete') throw new UnauthorizedException();
        if(userType === 'coach' && userId !== queryId) throw new UnauthorizedException();
        const coach = await this.prisma.coach.findUnique({
            where: {
                id: queryId
            },
            select: {
                id:true
            }
        });
        if(coach === null) throw new NotFoundException();
        await this.notificationService.removeAllNotification(queryId);
        await this.prisma.coach.delete({
            where: {
                id: queryId
            }
        });
        return;
    }

    async findAllNotifications(
        userType: string,
        userId: number,
        coachQueryId: number,
        page: number,
        pgsize: number
    ){
        if(userType === "coach" && (userId !== coachQueryId)) throw new UnauthorizedException();
        if(userType === "athlete"){
            const athlete = await this.prisma.athlete.findUnique({
                where: {
                    id: userId
                },
                select: {
                    coach_id: true
                }
            });
            if(athlete === null) throw new UnauthorizedException();
            if(athlete.coach_id !== coachQueryId) throw new UnauthorizedException();
        }
        return await this.notificationService.findAllNotifications(coachQueryId, page, pgsize)
    }

    async findOneNotification(
        userType: string,
        userId: number,
        coachQueryId: number,
        notificationQueryId: number
    ){
        if(userType === "coach" && (userId !== coachQueryId)) throw new UnauthorizedException();
        if(userType === "athlete"){
            const athlete = await this.prisma.athlete.findUnique({
                where: {
                    id: userId
                },
                select: {
                    coach_id: true
                }
            });
            if(athlete === null) throw new UnauthorizedException();
            if(athlete.coach_id !== coachQueryId) throw new UnauthorizedException();
        }
        return await this.notificationService.findOneNotification(coachQueryId, notificationQueryId);
    }

    async addNotification(
        userType: string,
        userId: number,
        coachQueryId: number,
        notificationTitle: string,
        notificationContent: string
    ){
        if(userType === "coach" && (userId !== coachQueryId)) throw new UnauthorizedException();
        if(userType === "athlete") throw new UnauthorizedException();
        return await this.notificationService.createNotification(coachQueryId, notificationTitle, notificationContent);
    }

    async updateNotification(
        userType: string,
        userId: number,
        coachQueryId: number,
        notificationQueryId: number,
        updateNotificationDto: UpdateNotificationDto
    ){
        if(userType === "coach" && (userId !== coachQueryId)) throw new UnauthorizedException();
        if(userType === "athlete") throw new UnauthorizedException();
        return await this.notificationService.updateNotification(coachQueryId, notificationQueryId, updateNotificationDto);
    }

    async removeNotification(
        userType: string,
        userId: number,
        coachQueryId: number,
        notificationQueryId: number
    ){
        if(userType === "coach" && (userId !== coachQueryId)) throw new UnauthorizedException();
        if(userType === "athlete") throw new UnauthorizedException();
        return this.notificationService.removeNotification(coachQueryId, notificationQueryId);
    }

}
