import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService){}

  async create(createAdminDto: CreateAdminDto) {
    if( createAdminDto.key !== process.env.ADMINKEY ) throw new UnauthorizedException();
    const admin = await this.prisma.admin.create({
      data: {
        email: createAdminDto.email,
        name: createAdminDto.name,
        password: createAdminDto.password
      }
    })
    return admin;
  }

  async findAll() {
    return await this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.admin.findUnique({
      where:  {
        id: id
      }
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.prisma.admin.update({
      where: {
        id: id
      },
      data: {
        email: updateAdminDto.email,
        name: updateAdminDto.name,
        password: updateAdminDto.password
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.admin.delete({
      where: {
        id: id
      }
    }) 
  }
}
