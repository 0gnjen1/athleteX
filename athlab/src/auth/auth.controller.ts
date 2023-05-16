import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalCoachGuard } from './guards/local.coach.guard';
import { LocalAthleteGuard } from './guards/local.athlete.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LocalAthleteGuard)
    @Post('athlete/login')
    athleteLogin(@Request() req){
        return this.authService.login(req.user.id, req.user.type);
    }

    @UseGuards(LocalCoachGuard)
    @Post('coach/login')
    coachLogin(@Request() req){
        return this.authService.login(req.user.id, req.user.type);
    }

}
