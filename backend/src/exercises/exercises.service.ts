import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExercisesService {

    constructor(
        private readonly prisma: PrismaService
    ){}

    async findAllExercises(
        page: number,
        pgsize: number
    ){
        return await this.prisma.exercise.findMany({
            skip: (page-1)*pgsize,
            take: pgsize,
            orderBy: {
                type: 'asc'
            }
        });
    }

    async findExerciseById(
        exerciseId: number
    ){
        const exercise = await this.prisma.exercise.findUnique({
            where: {
                id: exerciseId
            }
        });
        if(exercise === null) throw new NotFoundException();
        return exercise;
    }
  
    async createExercise(
        exerciseType: string
    ){
        return await this.prisma.exercise.create({
            data: {
                type: exerciseType
            }
        });
    }

    async updateExercise(
        exerciseId: number,
        exerciseType: string
    ){
        const exercise = await this.prisma.exercise.findUnique({
            where: {
                id: exerciseId
            }
        });
        if(exercise === null) throw new NotFoundException();
        return await this.prisma.exercise.update({
            where: {
                id: exerciseId
            },
            data: {
                type: exerciseType
            }
        });
    }

    async removeExercise(
        exerciseId: number
    ){
        const exercise = await this.prisma.exercise.findUnique({
            where: {
                id: exerciseId
            }
        });
        if(exercise === null) throw new NotFoundException();
        await this.prisma.exercise.delete({
            where: {
                id: exerciseId
            }
        });
        return;
    }

}
