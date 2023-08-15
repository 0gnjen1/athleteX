import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateAthleteDto } from '../dtos/athletes/update-athlete.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AthletesService {

    constructor(
        private readonly prisma: PrismaService
    ){}
  
    async findAllAthletes(
        userType: string,
        userId: number,
        page: number,
        pgsize: number
    ){
        if(userType === "admin"){
            return this.prisma.athlete.findMany({
                skip: (page-1)*pgsize,
                take: pgsize,
                select: {
                    id: true,
                    name: true
                }
            });
        }
        if(userType === "coach"){
            return this.prisma.athlete.findMany({
                skip: (page-1)*pgsize,
                take: pgsize,
                where: {
                    coach_id: userId
                },
                select: {
                    id: true,
                    name: true
                }
            });
        }
        if(userType === "athlete"){
            return this.prisma.athlete.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true
                }
            });
        }
        throw new UnauthorizedException();
    }
  
    async findAthleteById(
        userType: string,
        userId: number,
        queryId: number
    ){
        if(userType === "admin" || (userType === "athlete" && userId === queryId)){
            const athlete = await this.prisma.athlete.findUnique({
                where:{
                    id: queryId
                },
                select:{
                    id: true,
                    name: true,
                    coach: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            if(athlete === null) throw new NotFoundException();
            return athlete;
        }
        if(userType === "coach"){
            const athlete = await this.prisma.athlete.findUnique({
                where:{
                    id: queryId
                },
                select:{
                    id: true,
                    name: true,
                    coach: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            if(athlete === null) throw new NotFoundException();
            if(userId === athlete.coach.id) return athlete;
        }
        throw new BadRequestException();
    }
  
    async updateAthlete(
        userType: string,
        userId: number,
        queryId: number,
        updateAthleteDto: UpdateAthleteDto
    ){
        if(userType === 'coach' || (userType === 'athlete' && userId !== queryId)) throw new UnauthorizedException();
        const athlete = await this.prisma.athlete.findUnique({
            where: {
                id: queryId
            },
            select: {
                id:true
            }
        });
        if(athlete === null) throw new NotFoundException();
        return await this.prisma.coach.update({
            where: {
                id: queryId
            },
            data: {
                name: updateAthleteDto.name
            }
        });
    }
  
    async removeAthlete(
        userType: string,
        userId: number,
        queryId: number
    ){
        if(userType === "coach" || (userType === "athlete" && userId !== queryId)) throw new UnauthorizedException();
        const athlete = await this.prisma.athlete.findUnique({
            where: {
                id: queryId
            },
            select: {
                id: true
            }
        });
        if(athlete === null) throw new NotFoundException();
        await this.prisma.athlete.delete({
            where: {
                id: queryId
            }
        });
        return;
    }

    async setAthletesCoach(
        userType: string,
        athleteId: number,
        coachId: number
    ){
        if(userType !== "admin") throw new UnauthorizedException();
        await this.prisma.coach.update({
            where: {
                id: coachId
            },
            data: {
                athletes: {
                    connect: {
                        id: athleteId,
                    },
                },
            },
        })
        return;
    }

    async removeAthletesCoach(
        userType: string,
        queryId: number
    ){
        if(userType !== "admin") throw new UnauthorizedException();
        await this.prisma.athlete.update({
            where: {
                id: queryId
            },
            data: {
                coach_id: null
            }
        })
        return;
    }
  
}
