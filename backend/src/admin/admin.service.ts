import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

    constructor(private prisma: PrismaService){}

    async create(createAdminDto: CreateAdminDto) {
        if( createAdminDto.key !== process.env.ADMINKEY ) throw new UnauthorizedException();
        createAdminDto.password = bcrypt.hashSync(createAdminDto.password, 10);
        const admin = await this.prisma.admin.create({
            data: {
                email: createAdminDto.email,
                name: createAdminDto.name,
                password: createAdminDto.password
            }
        })
        return admin;
    }

    async findAll(userType: string, page: number, pgsize: number) {
        if(userType !== "admin") throw new UnauthorizedException();
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

    async findOne(userType: string, queryId: number) {
        if(userType !== "admin") throw new UnauthorizedException();
        const admin = await this.prisma.admin.findUnique({
            where:  {
                id: queryId
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        if(admin === null) throw new NotFoundException();
        return admin;
    }

    async update(userType:string, queryId: number, updateAdminDto: UpdateAdminDto) {
        if(userType !== "admin") throw new UnauthorizedException();
        return await this.prisma.admin.update({
            where: {
                id: queryId
            },
            data: {
                name: updateAdminDto.name
            }
        });
    }
    
    async remove(userType: string, queryId: number) {
        if(userType !== "admin") throw new UnauthorizedException();
        await this.prisma.admin.delete({
            where: {
                id: queryId
            }
        });
        return
    }

}
