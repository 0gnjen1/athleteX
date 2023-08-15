import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { UpdateAthleteDto } from '../dtos/athletes/update-athlete.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PagePipe } from 'src/pipes/pagination/page.pipe';
import { PageSizePipe } from 'src/pipes/pagination/page-size.pipe';
import { User } from 'src/decorators/users/user-from-req.decorator';

@Controller('athletes')
export class AthletesController {

    constructor(
        private readonly athletesService: AthletesService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllAthletes(
        @User() user,
        @Query('page', PagePipe) page: number,
        @Query('pgsize', PageSizePipe) pgsize: number
    ){
        return await this.athletesService.findAllAthletes(
            user.type,
            user.id, page,
            pgsize
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findAthleteById(
        @User() user,
        @Param('id', ParseIntPipe) queryId: number
    ){
        return await this.athletesService.findAthleteById(
            user.type,
            user.id,
            queryId
        );
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateAthlete(
        @User() user,
        @Param('id', ParseIntPipe) queryId: number,
        @Body() updateAthleteDto: UpdateAthleteDto
    ){
        return await this.athletesService.updateAthlete(
            user.type,
            user.id,
            queryId,
            updateAthleteDto
        );
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeAthlete(
        @User() user,
        @Param('id', ParseIntPipe) queryId: number
    ){
        return await this.athletesService.removeAthlete(
            user.type,
            user.id,
            queryId
        );
    }
  
    @UseGuards(JwtAuthGuard)
    @Post(':athleteid/setcoach/:coachid')
    async setAthletesCoach(
        @User() user,
        @Param('athleteid', ParseIntPipe) athleteId: number,
        @Param('coachid', ParseIntPipe) coachId: number
    ){
        return await this.athletesService.setAthletesCoach(
            user.type,
            athleteId,
            coachId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/removecoach')
    async removeAthletesCoach(
        @User() user,
        @Param('id', ParseIntPipe) queryId: number
    ){
        return await this.athletesService.removeAthletesCoach(
            user.type,
            queryId
        );
    }

}
