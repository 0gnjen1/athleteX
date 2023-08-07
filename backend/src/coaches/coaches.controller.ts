import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { UpdateCoachDto } from '../dtos/coaches/update-coach.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PagePipe } from 'src/pipes/pagination/page.pipe';
import { PageSizePipe } from 'src/pipes/pagination/page-size.pipe';
import { User } from 'src/decorators/users/user-from-req.decorator';

@Controller('coaches')
export class CoachesController {
    constructor(private readonly coachesService: CoachesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(    @User() user,
                @Query('page', PagePipe) page: number,
                @Query('pgsize', PageSizePipe) pgsize: number) {
        return this.coachesService.findAll(user.type, user.id, page, pgsize);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@User() user,
            @Param('id', ParseIntPipe) queryId: number) {
        return this.coachesService.findOne(user.type, user.id, queryId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update( @User() user,
            @Param('id', ParseIntPipe) queryId: number,
            @Body() updateCoachDto: UpdateCoachDto) {
        return this.coachesService.update(user.type, user.id, queryId, updateCoachDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove( @User() user,
            @Param('id', ParseIntPipe) queryId: number) {
        return this.coachesService.remove(user.type, user.id, queryId);
    }

}
