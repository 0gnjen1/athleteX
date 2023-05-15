import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoachesModule } from './coaches/coaches.module';
import { AthletesModule } from './athletes/athletes.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),
  CoachesModule,
  AthletesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
