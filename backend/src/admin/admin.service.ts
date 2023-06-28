import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService){}

    async create(createAdminDto: CreateAdminDto) {
        if( createAdminDto.key !== process.env.ADMINKEY ) throw new UnauthorizedException();
        const pwdhash = bcrypt.hashSync(createAdminDto.password, 10);
        const admin = await this.prisma.admin.create({
            data: {
                email: createAdminDto.email,
                name: createAdminDto.name,
                password: pwdhash
            }
        })
        return admin;
    }

    async findAll(page: number, pgsize: number) {
        return await this.prisma.admin.findMany({
            skip: (page-1)*pgsize,
            take: pgsize,
            select: {
                id: true,
                email: true,
                name: true
            }
        });
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
    
    remove(id: number) {
        return this.prisma.admin.delete({
            where: {
                id: id
            }
        })
    }

}
