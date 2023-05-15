import { Injectable } from '@nestjs/common';
import { Admin, PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  async getHello(): Promise<Admin[]> {
    const prisma = new PrismaClient()
    const admin = await prisma.admin.create({
      data: {
        email: "admin2@gmail.com",
        name: "Donnie",
        password: "not hashed lol"
      }
    });
    return prisma.admin.findMany();
  }
}
