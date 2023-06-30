import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, Query } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('athletes')
export class AthletesController {

    constructor(private readonly athletesService: AthletesService) {}

    @Post()
    async create(@Body() createAthleteDto: CreateAthleteDto) {
        return this.athletesService.create(createAthleteDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req, @Query('page') page, @Query('pgsize') pgsize) {
        return await this.athletesService.findAll(req.user.type, +req.user.id, +page, +pgsize);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Request() req, @Param('id') athleteId: string) {
        return await this.athletesService.findOne(req.user.type, req.user.id, +athleteId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Request() req, @Param('id') athleteId: string, @Body() updateAthleteDto: UpdateAthleteDto) {
        return await this.athletesService.update(req.user.type, +req.user.id, +athleteId, updateAthleteDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Request() req, @Param('id') athleteId: string) {
        return await this.athletesService.remove(req.user.type, +req.user.id, +athleteId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post(':athleteid/setcoach/:coachid')
    async setCoach(@Request() req, @Param('athleteid') athleteId: string, @Param('coachid') coachId: string){
        return await this.athletesService.setCoach(req.user.type, +athleteId, +coachId);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/removecoach')
    async removeCoach(@Request() req, @Param('id') athleteId: string){
        return await this.athletesService.removeCoach(req.user.type, +athleteId);
    }

}
