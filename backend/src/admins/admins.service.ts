import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateAdminDto } from '../dtos/admins/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminsService {

    constructor(
        private readonly prisma: PrismaService
    ){}

    async findAllAdmins(
        userType: string,
        page: number,
        pgsize: number
    ){
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

    async findAdminById(
        userType: string,
        queryId: number
    ){
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

    async updateAdmin(
        userType: string,
        userId: number,
        queryId: number,
        updateAdminDto: UpdateAdminDto
    ){
        if(userType !== "admin" || userId !== queryId) throw new UnauthorizedException();
        const admin = await this.prisma.admin.findUnique({
            where: {
                id: queryId
            },
            select: {
                id: true
            }
        });
        if(admin === null) throw new NotFoundException();
        return await this.prisma.admin.update({
            where: {
                id: queryId
            },
            data: {
                name: updateAdminDto.name
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }
    
    async removeAdmin(
        userType: string,
        userId: number,
        queryId: number
    ){
        if(userType !== "admin" || userId !== queryId) throw new UnauthorizedException();
        const admin = await this.prisma.admin.findUnique({
            where: {
                id: queryId
            },
            select: {
                id: true
            }
        });
        if(admin === null) throw new NotFoundException();
        const value = await this.prisma.admin.delete({
            where: {
                id: queryId
            }
        });
        return;
    }

}
