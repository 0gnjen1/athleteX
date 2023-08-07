import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoachesModule } from '../coaches/coaches.module';
import { AthletesModule } from '../athletes/athletes.module';
import { AuthModule } from '../auth/auth.module';
import { AdminsModule } from '../admins/admins.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports:      [ConfigModule.forRoot({
                        envFilePath: '.env',
                        isGlobal: true
                    }),
                    CoachesModule,
                    AthletesModule,
                    AuthModule,
                    AdminsModule,
                    NotificationsModule
                ],
  controllers:  [AppController],
  providers:    [AppService],
})
export class AppModule {}
