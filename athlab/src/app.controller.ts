import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Admin } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<Admin[]> {
    return this.appService.getHello();
  }
}
