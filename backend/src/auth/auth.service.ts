import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}

    async registerAthlete(name: string, email: string, password: string) {
        password = bcrypt.hashSync(password, 10);
        return await this.prisma.athlete.create({
            data: {
                email: email,
                password: password,
                name: name,
                coach_id: null
            }
        });
    }

    async validateAthlete(email: string, password: string){
        const athlete = await this.prisma.athlete.findUnique({
            where: {
                email: email
            }
        })
        if(bcrypt.compareSync(password, athlete.password)){
            const result = {
                id: athlete.id,
                type: "athlete"
            }
            return result;
        }
        return null;
    }

    async registerCoach(name: string, email: string, password: string) {
        password = bcrypt.hashSync(password, 10);
        return await this.prisma.coach.create({
            data: {
                email: email,
                password: password,
                name: name
            }
        });
    }

    async validateCoach(email: string, password: string){
        const coach = await this.prisma.coach.findUnique({
            where: {
                email: email
            }
        })
        if(bcrypt.compareSync(password, coach.password)){
            const result = {
                id: coach.id,
                type: "coach"
            }
            return result;
        }
        return null;
    }

    async registerAdmin(name: string, email: string, password: string, key: string) {
        if( key !== process.env.ADMINKEY ) throw new UnauthorizedException();
        password = bcrypt.hashSync(password, 10);
        const admin = await this.prisma.admin.create({
            data: {
                email: email,
                name: name,
                password: password
            }
        })
        return admin;
    }

    async validateAdmin(email: string, password: string){
        const admin = await this.prisma.admin.findUnique({
            where: {
                email: email
            }
        })
        if(bcrypt.compareSync(password, admin.password)){
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
