import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService){}

  async create(createAdminDto: CreateAdminDto) {
    if( createAdminDto.key !== process.env.ADMINKEY ) throw new UnauthorizedException();
    try{
      const admin = await this.prisma.admin.create({
        data: {
          email: createAdminDto.email,
          name: createAdminDto.name,
          password: createAdminDto.password
        }
      })
      return admin;
    }catch(e){
      return new BadRequestException();
    }
  }

  async findAll() {
    try{
      return await this.prisma.admin.findMany();
    }catch(e){
      return new BadRequestException();
    }
  }

  async findOne(id: number) {
    try{
      return await this.prisma.admin.findUnique({
        where:  {
          id: id
        }
      });
    }catch(e){
      throw new BadRequestException();
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try{
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
    }catch(e){
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try{
      return await this.prisma.admin.delete({
        where: {
          id: id
        }
      })
    }catch(e){
      return new BadRequestException();
    }
  }
}
