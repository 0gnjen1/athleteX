import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}

    async validateAthlete(email: string, password: string){
        const athlete = await this.prisma.athlete.findUnique({
            where: {
                email: email
            }
        })
        if(athlete.password === password){
            const result = {
                id: athlete.id,
                type: "athlete"
            }
            return result;
        }
        return null;
    }

    async validateCoach(email: string, password: string){
        const coach = await this.prisma.coach.findUnique({
            where: {
                email: email
            }
        })
        if(coach.password === password){
            const result = {
                id: coach.id,
                type: "coach"
            }
            return result;
        }
        return null;
    }

    async validateAdmin(email: string, password: string){
        const admin = await this.prisma.admin.findUnique({
            where: {
                email: email
            }
        })
        if(admin.password === password){
            const result = {
                id: admin.id,
                type: "admin"
            }
            return result;
        }
        return null;
    }

    async login(id: number, type: string){
        const payload = {
            id: id,
            type: type
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

}
