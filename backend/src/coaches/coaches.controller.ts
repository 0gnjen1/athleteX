import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, Post } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { UpdateCoachDto } from '../dtos/coaches/update-coach.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PagePipe } from 'src/pipes/pagination/page.pipe';
import { PageSizePipe } from 'src/pipes/pagination/page-size.pipe';
import { User } from 'src/decorators/users/user-from-req.decorator';
import { CreateNotificationDto } from 'src/dtos/notifications/create-notification.dto';
import { UpdateNotificationDto } from 'src/dtos/notifications/update-notification.dto';

@Controller('coaches')
export class CoachesController {

    constructor(
        private readonly coachesService: CoachesService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllCoaches(
        @User() user,
        @Query('page', PagePipe) page: number,
        @Query('pgsize', PageSizePipe) pgsize: number
    ){
        return await this.coachesService.findAllCoaches(
            user.type,
            user.id,
            page,
            pgsize
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':coachid')
    async findCoachById(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number
    ){
        return await this.coachesService.findCoachById(
            user.type,
            user.id,
            coachQueryId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':coachid')
    async updateCoach(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Body() updateCoachDto: UpdateCoachDto
    ){
        return await this.coachesService.updateCoach(
            user.type,
            user.id,
            coachQueryId,
            updateCoachDto
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':coachid')
    async removeCoach(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number
    ){
        return await this.coachesService.removeCoach(
            user.type,
            user.id,
            coachQueryId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':coachid/notifications')
    async findAllNotifications(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Query('page', PagePipe) page: number,
        @Query('pgsize', PageSizePipe) pgsize: number
    ){
        return await this.coachesService.findAllNotifications(
            user.type,
            user.id,
            coachQueryId,
            page,
            pgsize
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':coachid/notifications/:notificationid')
    async findNotificationById(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Param('notificationid', ParseIntPipe) notificationQueryId: number
    ){
        return await this.coachesService.findNotificationById(
            user.type,
            user.id,
            coachQueryId,
            notificationQueryId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post(':coachid/notifications')
    async createNotification(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Body() createNotificationDto: CreateNotificationDto
    ){
        return await this.coachesService.createNotification(
            user.type,
            user.id,
            coachQueryId,
            createNotificationDto.title,
            createNotificationDto.content
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post(':coachid/notifications/:notificationid')
    async updateNotification(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Param('notificationid', ParseIntPipe) notificationQueryId: number,
        @Body() updateNotificationDto: UpdateNotificationDto
    ){
        return await this.coachesService.updateNotification(
            user.type,
            user.id,
            coachQueryId,
            notificationQueryId,
            updateNotificationDto
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':coachid/notifications/:notificationid')
    async removeNotification(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Param('notificationid', ParseIntPipe) notificationQueryId: number,
    ){
        return await this.coachesService.removeNotification(
            user.type,
            user.id,
            coachQueryId,
            notificationQueryId
        );
    }

}
