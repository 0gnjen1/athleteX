import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CoachesService {

    constructor(private prisma: PrismaService){}

    async create(createCoachDto: CreateCoachDto) {
        const pwdhash = bcrypt.hashSync(createCoachDto.password, 10);
        return await this.prisma.coach.create({
            data: {
                email: createCoachDto.email,
                password: pwdhash,
                name: createCoachDto.name
            }
        });
    }

    async findAll(usertype: string, page: number, pgsize: number) {
        if(usertype === 'admin'){
            return await this.prisma.coach.findMany({
                skip: (page-1)*pgsize,
                take: pgsize,
                select: {
                    id: true,
                    name: true
                }
            });
        }
        throw new UnauthorizedException()
    }

    async findOne(userType: string, userId: number, queryId: number) {
        if(userType === 'admin' || (userType === 'coach' && userId === queryId)){
            return await this.prisma.coach.findUnique({
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
            if(athlete.coach_id === queryId){
                return await this.prisma.coach.findUnique({
                    where: {
                        id: queryId
                    },
                    select: {
                        id: true,
                        name: true,
                    }
                })
            }
        }
        throw new UnauthorizedException();
    }

    async update(userType: string, userId: number, queryId: number, updateCoachDto: UpdateCoachDto) {
        if(userType === 'admin' || (userType === 'coach' && userId === queryId)){
            return await this.prisma.coach.update({
                where: {
                    id: queryId
                },
                data: {
                    email: updateCoachDto.email,
                    password: updateCoachDto.password,
                    name: updateCoachDto.name
                }
            });
        }
        throw new UnauthorizedException();
    }

    async remove(userType: string, userId: number, queryId: number) {
        if(userType === 'admin' || (userType === 'coach' && userId === queryId)){
            return await this.prisma.coach.delete({
                where: {
                    id: queryId
                }
            })
        }
        throw new UnauthorizedException();
    }

}
