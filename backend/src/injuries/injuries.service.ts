import { Injectable } from '@nestjs/common';
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

}
