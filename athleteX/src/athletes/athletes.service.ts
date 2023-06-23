import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AthletesService {

  constructor(private prisma: PrismaService){}

  async create(createAthleteDto: CreateAthleteDto) {
    try{
      return await this.prisma.athlete.create({
        data: {
          email: createAthleteDto.email,
          password: createAthleteDto.password,
          name: createAthleteDto.name,
          coach_id: null
        }
      });
    }catch(e){
      return new BadRequestException();
    }
  }
  
  async findAll() {
    try{
      return await this.prisma.athlete.findMany({
        select: {
          id: true,
          name: true
        }
      });
    }catch(e){
      return new BadRequestException();
    }
  }
  
  async findOne(id: number) {
    try{
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
    }catch(e){
      return new BadRequestException();
    }
  }
  
  async update(id: number, updateAthleteDto: UpdateAthleteDto) {
    try{
      return await this.prisma.athlete.update({
        where: {
          id: id
        },
        data: {
          email: updateAthleteDto.email,
          password: updateAthleteDto.password,
          name: updateAthleteDto.name
        },
        select: {
          id: true,
          email: true,
          name: true
        }
      }); 
    }catch(e){
      return new BadRequestException();
    }
  }
  
  async remove(id: number) {
    try{
      await this.prisma.athlete.delete({
        where: {
          id: id
        }
      })
      return 'removed athlete';
    }catch(e){
      return new BadRequestException();
    }
  }

  async setCoach(athleteid: number, coachid: number){
    try{
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
    }catch(e){
      return new BadRequestException();
    }
  }

  async removeCoach(id: number){
    try{
      await this.prisma.athlete.update({
        where: {
          id: id
        },
        data: {
          coach_id: null
        }
      })
      return 'removed coach';
    }catch(e){
      return new BadRequestException();
    }
  }
  
}
