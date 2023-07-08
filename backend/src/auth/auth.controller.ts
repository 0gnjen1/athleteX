import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalCoachGuard } from './guards/local.coach.guard';
import { LocalAthleteGuard } from './guards/local.athlete.guard';
import { LocalAdminGuard } from './guards/local.admin.guard';
import { User } from 'src/decorators/users/user-from-req.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LocalAthleteGuard)
    @Post('athlete/login')
    athleteLogin(@User() user){
        return this.authService.login(user.id, user.type);
    }

    @UseGuards(LocalCoachGuard)
    @Post('coach/login')
    coachLogin(@User() user){
        return this.authService.login(user.id, user.type);
    }

    @UseGuards(LocalAdminGuard)
    @Post('admin/login')
    adminLogin(@User() user){
        return this.authService.login(user.id, user.type);
    }

}
