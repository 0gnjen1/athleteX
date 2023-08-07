import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateCoachDto } from '../dtos/coaches/update-coach.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoachesService {

    constructor(private prisma: PrismaService){}

    async findAll(userType: string, userId: number, page: number, pgsize: number) {
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

    async findOne(userType: string, userId: number, queryId: number) {
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

    async update(userType: string, userId: number, queryId: number, updateCoachDto: UpdateCoachDto) {
        if(userType === 'athlete' || (userType === 'coach' && userId !== queryId)) throw new UnauthorizedException();
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

    async remove(userType: string, userId: number, queryId: number) {
        if(userType === 'athlete' || (userType === 'coach' && userId !== queryId)) throw new UnauthorizedException();
        const coach = await this.prisma.coach.findUnique({
            where: {
                id: queryId
            },
            select: {
                id:true
            }
        });
        if(coach === null) throw new NotFoundException();
        await this.prisma.coach.delete({
            where: {
                id: queryId
            }
        });
        return;
    }

}
