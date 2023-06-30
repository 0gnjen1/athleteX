import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AthletesService {

    constructor(private prisma: PrismaService){}

    async create(createAthleteDto: CreateAthleteDto) {
        const pwdhash = bcrypt.hashSync(createAthleteDto.password, 10);
        return await this.prisma.athlete.create({
            data: {
                email: createAthleteDto.email,
                password: pwdhash,
                name: createAthleteDto.name,
                coach_id: null
            }
        });
    }
  
    async findAll() {
        return await this.prisma.athlete.findMany({
            select: {
                id: true,
                name: true
            }
        });
    }
  
    async findOne(id: number) {
        return await this.prisma.athlete.findUnique({
            where:{id},
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
  
    async update(id: number, updateAthleteDto: UpdateAthleteDto) {
        return await this.prisma.athlete.update({
            where: {
                id: id
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
  
    async remove(id: number) {
        await this.prisma.athlete.delete({
            where: {
                id: id
            }
        })
      return 'removed athlete';
    }

    async setCoach(athleteid: number, coachid: number){
        await this.prisma.coach.update({
            where: {
                id: coachid
            },
            data: {
                athletes: {
                    connect: {
                        id: athleteid,
                    },
                },
            },
        })
      return 'updated coach';
    }

    async removeCoach(id: number){
        await this.prisma.athlete.update({
            where: {
                id: id
            },
            data: {
                coach_id: null
            }
        })
        return 'removed coach';
    }
  
}
