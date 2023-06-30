import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AthletesService {

    constructor(private prisma: PrismaService){}

    async create(createAthleteDto: CreateAthleteDto) {
        createAthleteDto.password = bcrypt.hashSync(createAthleteDto.password, 10);
        return await this.prisma.athlete.create({
            data: {
                email: createAthleteDto.email,
                password: createAthleteDto.password,
                name: createAthleteDto.name,
                coach_id: null
            }
        });
    }
  
    async findAll(userType: string, userId: number, page: number, pgsize: number) {
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
  
    async findOne(userType: string, userId: number, athleteId: number) {
        if(userType === "admin" || (userType === "athlete" && userId === athleteId)){
            return await this.prisma.athlete.findUnique({
                where:{
                    id: athleteId
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
        }
        if(userType === "coach"){
            const athlete = await this.prisma.athlete.findUnique({
                where:{
                    id: athleteId
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
            if(userId === athlete.coach.id) return athlete;
        }
        throw new UnauthorizedException();
    }
  
    async update(userType: string, userId: number, athleteId: number, updateAthleteDto: UpdateAthleteDto) {
        if(userType === "admin" || (userType === "athlete" && userId === athleteId)){
            return await this.prisma.athlete.update({
                where: {
                    id: athleteId
                },
                data: {
                    name: updateAthleteDto.name
                },
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            }); 
        }
        throw new UnauthorizedException();
    }
  
    async remove(userType: string, userId: number, athleteId: number) {
        if(userType === "admin" || (userType === "athlete" && userId === athleteId)){
            await this.prisma.athlete.delete({
                where: {
                    id: athleteId
                }
            })
            return 'removed athlete';
        }
        throw new UnauthorizedException();
    }

    async setCoach(userType:string, athleteId: number, coachId: number){
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
        return 'updated coach';
    }

    async removeCoach(userType: string, athleteId: number){
        if(userType !== "admin") throw new UnauthorizedException();
        await this.prisma.athlete.update({
            where: {
                id: athleteId
            },
            data: {
                coach_id: null
            }
        })
        return 'removed coach';
    }
  
}
