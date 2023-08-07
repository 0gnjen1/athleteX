import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { CreateAthleteDto } from '../dtos/athletes/create-athlete.dto';
import { UpdateAthleteDto } from '../dtos/athletes/update-athlete.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PagePipe } from 'src/pipes/pagination/page.pipe';
import { PageSizePipe } from 'src/pipes/pagination/page-size.pipe';
import { User } from 'src/decorators/users/user-from-req.decorator';

@Controller('athletes')
export class AthletesController {

    constructor(private readonly athletesService: AthletesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(  @User() user,
                    @Query('page', PagePipe) page: number,
                    @Query('pgsize', PageSizePipe) pgsize: number) {
        return await this.athletesService.findAll(user.type, user.id, page, pgsize);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(  @User() user,
                    @Param('id', ParseIntPipe) queryId: number) {
        return await this.athletesService.findOne(user.type, user.id, queryId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(   @User() user,
                    @Param('id', ParseIntPipe) queryId: number,
                    @Body() updateAthleteDto: UpdateAthleteDto) {
        return await this.athletesService.update(user.type, user.id, queryId, updateAthleteDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(   @User() user,
                    @Param('id', ParseIntPipe) queryId: number) {
        return await this.athletesService.remove(user.type, user.id, queryId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post(':athleteid/setcoach/:coachid')
    async setCoach( @User() user,
                    @Param('athleteid', ParseIntPipe) athleteId: number,
                    @Param('coachid', ParseIntPipe) coachId: number){
        return await this.athletesService.setCoach(user.type, athleteId, coachId);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/removecoach')
    async removeCoach(  @User() user,
                        @Param('id', ParseIntPipe) queryId: number){
        return await this.athletesService.removeCoach(user.type, queryId);
    }

}
