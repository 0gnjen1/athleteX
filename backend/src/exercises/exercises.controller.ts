import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from '../dtos/exercises/create-exercise.dto';
import { UpdateExerciseDto } from '../dtos/exercises/update-exercise.dto';
import { PagePipe } from 'src/pipes/pagination/page.pipe';
import { PageSizePipe } from 'src/pipes/pagination/page-size.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/decorators/users/user-from-req.decorator';

@Controller('exercises')
export class ExercisesController {
    
    constructor(
        private readonly exercisesService: ExercisesService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllExercises(
        @Query('page', PagePipe) page: number,
        @Query('pgsize', PageSizePipe) pgsize: number
    ){
        return await this.exercisesService.findAllExercises(
            page,
            pgsize
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':exerciseid')
    async findExerciseById(
        @Param('exerciseid', ParseIntPipe) exerciseQueryId: number
    ){
        return await this.exercisesService.findExerciseById(
            exerciseQueryId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createExercise(
        @User() user,
        @Body() createExerciseDto: CreateExerciseDto
    ){
        if(user.type !== "admin") throw new UnauthorizedException();
        return await this.exercisesService.createExercise(createExerciseDto.type);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':exerciseid')
    async updateExercise(
        @User() user,
        @Param('exerciseid', ParseIntPipe) exerciseQueryId: number,
        @Body() updateExerciseDto: UpdateExerciseDto
    ){
        if(user.type !== "admin") throw new UnauthorizedException();
        return this.exercisesService.updateExercise(exerciseQueryId, updateExerciseDto.type);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":exerciseid")
    async removeExercise(
        @User() user,
        @Param('exerciseid', ParseIntPipe) exerciseQueryId: number,
    ){
        if(user.type !== "admin") throw new UnauthorizedException();
        await this.exercisesService.removeExercise(exerciseQueryId);
    }

}
