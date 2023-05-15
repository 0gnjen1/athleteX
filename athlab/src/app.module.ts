import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoachesModule } from './coaches/coaches.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),
  CoachesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
