import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalAthleteStrategy } from './strategies/local.athlete.strategy';
import { LocalCoachStrategy } from './strategies/local.coach.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAdminGuard } from './guards/local.admin.guard';
import { LocalAdminStrategy } from './strategies/local.admin.strategy';

@Module({
  providers:    [AuthService,
                    PrismaService,
                    LocalAthleteStrategy,
                    LocalCoachStrategy,
                    LocalAdminStrategy,
                    JwtStrategy],
  imports:      [PassportModule,
                    JwtModule.register({
                        secret: process.env.JWTKEY,
                        signOptions: { expiresIn: '2592000s' } // 30 days
                    })],
  controllers:  [AuthController],
  exports:      [AuthModule]
})
export class AuthModule {}
