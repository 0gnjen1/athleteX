import { Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CoachesService {

  constructor(private prisma: PrismaService){}

  async create(createCoachDto: CreateCoachDto) {
    return await this.prisma.coach.create({
      data: {
        email: createCoachDto.email,
        password: createCoachDto.password,
        name: createCoachDto.name
      }
    });
  }

  async findAll() {
    return await this.prisma.coach.findMany({
      select: {
        id: true,
        name: true
      }
    });
  }

  async findOne(id: number) { 
    return await this.prisma.coach.findUnique({
      where:{id},
      select: {
        id: true,
        name: true,
        athletes: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  }

  async update(id: number, updateCoachDto: UpdateCoachDto) {
    return await this.prisma.coach.update({
      where: {
        id: id
      },
      data: {
        email: updateCoachDto.email,
        password: updateCoachDto.password,
        name: updateCoachDto.name
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.coach.delete({
      where: {
        id: id
      }
    }) 
  }
}
