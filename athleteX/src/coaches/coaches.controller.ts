import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('coaches')
export class CoachesController {
    constructor(private readonly coachesService: CoachesService) {}

    @Post()
    create(@Body() createCoachDto: CreateCoachDto) {
        return this.coachesService.create(createCoachDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req) {
        return this.coachesService.findAll(req.user.type);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Request() req, @Param('id') queryId: string) {
        return this.coachesService.findOne(req.user.type, +req.user.id, +queryId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Request() req, @Param('id') queryId: string, @Body() updateCoachDto: UpdateCoachDto) {
        return this.coachesService.update(req.user.type, +req.user.id, +queryId, updateCoachDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Request() req, @Param('id') queryId: string) {
        return this.coachesService.remove(req.user.type, +req.user.id, +queryId);
    }

}
