import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}

    async registerAdmin(name: string, email: string, password: string, key: string) {
        if( key !== process.env.ADMINKEY ) throw new UnauthorizedException();
        const emailAlreadyInDatabase = await this.prisma.admin.findUnique({
            where: {
                email: email
            },
            select: {
                id: true
            }
        });
        if(emailAlreadyInDatabase !== null) throw new BadRequestException('The email is already associated with an account');
        password = bcrypt.hashSync(password, 10);
        const admin = await this.prisma.admin.create({
            data: {
                name: name,
                email: email,
                password: password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        return admin;
    }

    async registerAthlete(name: string, email: string, password: string) {
        const emailAlreadyInDatabase = await this.prisma.athlete.findUnique({
            where: {
                email: email
            },
            select: {
                id: true
            }
        });
        if(emailAlreadyInDatabase !== null) throw new BadRequestException('The email is already associated with an account');
        password = bcrypt.hashSync(password, 10);
        const athlete = await this.prisma.athlete.create({
            data: {
                name: name,
                email: email,
                password: password,
                coach_id: null
            },
            select: {
                id: true,
                name: true,
                email: true,
                coach_id: true
            }
        });
        return athlete;
    }

    async registerCoach(name: string, email: string, password: string) {
        const emailAlreadyInDatabase = await this.prisma.coach.findUnique({
            where: {
                email: email
            },
            select: {
                id: true
            }
        });
        if(emailAlreadyInDatabase !== null) throw new BadRequestException('The email is already associated with an account');
        password = bcrypt.hashSync(password, 10);
        const coach = await this.prisma.coach.create({
            data: {
                email: email,
                password: password,
                name: name
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        return coach;
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
