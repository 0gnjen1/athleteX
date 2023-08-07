import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalCoachGuard } from './guards/local.coach.guard';
import { LocalAthleteGuard } from './guards/local.athlete.guard';
import { LocalAdminGuard } from './guards/local.admin.guard';
import { User } from '../decorators/users/user-from-req.decorator';
import { CreateAthleteDto } from 'src/dtos/athletes/create-athlete.dto';
import { CreateCoachDto } from 'src/dtos/coaches/create-coach.dto';
import { CreateAdminDto } from 'src/dtos/admins/create-admin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register/admins')
    registerAdmin(@Body() createAdminDto: CreateAdminDto){
        return this.authService.registerAdmin(
            createAdminDto.name,
            createAdminDto.email,
            createAdminDto.password,
            createAdminDto.key
        );
    }

    @Post('register/athletes')
    registerAthlete(@Body() createAthleteDto: CreateAthleteDto){
        return this.authService.registerAthlete(
            createAthleteDto.name,
            createAthleteDto.email,
            createAthleteDto.password
        );
    }

    @Post('register/coaches')
    registerCoach(@Body() createCoachDto: CreateCoachDto){
        return this.authService.registerCoach(
            createCoachDto.name,
            createCoachDto.email,
            createCoachDto.password
        );
    }

    @UseGuards(LocalAthleteGuard)
    @Post('login/athletes')
    athleteLogin(@User() user){
        return this.authService.login(
            user.id,
            user.type
        );
    }

    @UseGuards(LocalAdminGuard)
    @Post('login/admins')
    adminLogin(@User() user){
        return this.authService.login(
            user.id,
            user.type
        );
    }

    @UseGuards(LocalCoachGuard)
    @Post('login/coaches')
    coachLogin(@User() user){
        return this.authService.login(
            user.id,
            user.type
        );
    }

}
