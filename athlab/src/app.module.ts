import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoachesModule } from './coaches/coaches.module';
import { AthletesModule } from './athletes/athletes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports:      [ConfigModule.forRoot({
                    envFilePath: '.env',
                    isGlobal: true
                  }),
                  CoachesModule,
                  AthletesModule,
                  AuthModule],
  controllers:  [AppController],
  providers:    [AppService],
})
export class AppModule {}
