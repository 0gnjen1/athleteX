import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InjuriesService {

    constructor(private readonly prisma: PrismaService){}

    async createInjury(type: string){
        return await this.prisma.injury.create({
            data: {
                type: type
            }
        });
    }

    async getAllInjuries(page: number, pgsize: number){
        return await this.prisma.injury.findMany({
            take: page,
            skip: (page-1)*pgsize,
            orderBy: {
                type: 'asc'
            }
        });
    }

    async getInjuriesById(injuryId: number){
        const injury = await this.prisma.injury.findUnique({
            where: {
                id: injuryId
            }
        });
        if(injury === null) throw new NotFoundException();
        return injury;
    }

}
