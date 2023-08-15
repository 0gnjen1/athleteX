import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InjuriesService {

    constructor(
        private readonly prisma: PrismaService
    ){}

    async findAllInjuries(
        page: number,
        pgsize: number
    ){
        return await this.prisma.injury.findMany({
            skip: (page-1)*pgsize,
            take: pgsize,
            orderBy: {
                type: 'asc'
            }
        });
    }

    async findInjuryById(
        injuryId: number
    ){
        const injury = await this.prisma.injury.findUnique({
            where: {
                id: injuryId
            }
        });
        if(injury === null) throw new NotFoundException();
        return injury;
    }

    async createInjury(
        injuryType: string
    ){
        return await this.prisma.injury.create({
            data: {
                type: injuryType
            }
        });
    }

    async updateInjury(
        injuryId: number,
        injuryType: string
    ){
        const injury = await this.prisma.injury.findUnique({
            where: {
                id: injuryId
            }
        });
        if(injury === null) throw new NotFoundException();
        return await this.prisma.injury.update({
            where: {
                id: injuryId
            },
            data: {
                type: injuryType
            }
        });
    }

    async removeInjury(
        injuryId: number
    ){
        const injury = await this.prisma.injury.findUnique({
            where: {
                id: injuryId
            }
        });
        if(injury === null) throw new NotFoundException();
        await this.prisma.injury.delete({
            where: {
                id: injuryId
            }
        });
        return;
    }

}
