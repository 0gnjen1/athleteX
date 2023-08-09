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
    constructor(private readonly coachesService: CoachesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAllCoaches(
        @User() user,
        @Query('page', PagePipe) page: number,
        @Query('pgsize', PageSizePipe) pgsize: number
    ){
        return this.coachesService.findAll(
            user.type,
            user.id,
            page,
            pgsize
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':coachid')
    findOneCoach(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number
    ){
        return this.coachesService.findOne(
            user.type,
            user.id,
            coachQueryId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':coachid')
    updateCoach(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Body() updateCoachDto: UpdateCoachDto
    ){
        return this.coachesService.update(
            user.type,
            user.id,
            coachQueryId,
            updateCoachDto
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':coachid')
    removeCoach(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number
    ){
        return this.coachesService.remove(
            user.type,
            user.id,
            coachQueryId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':coachid/notifications')
    findAllNotifications(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Query('page', PagePipe) page: number,
        @Query('pgsize', PageSizePipe) pgsize: number
    ){
        return this.coachesService.findAllNotifications(
            user.type,
            user.id,
            coachQueryId,
            page,
            pgsize
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':coachid/notifications/:notificationid')
    findOneNotification(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Param('notificationid', ParseIntPipe) notificationQueryId: number
    ){
        return this.coachesService.findOneNotification(
            user.type,
            user.id,
            coachQueryId,
            notificationQueryId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post(':coachid/notifications')
    createNotification(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Body() createNotificationDto: CreateNotificationDto
    ){
        return this.coachesService.addNotification(
            user.type,
            user.id,
            coachQueryId,
            createNotificationDto
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post(':coachid/notifications/:notificationid')
    updateNotification(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Param('notificationid', ParseIntPipe) notificationQueryId: number,
        @Body() updateNotificationDto: UpdateNotificationDto
    ){
        return this.coachesService.updateNotification(
            user.type,
            user.id,
            coachQueryId,
            notificationQueryId,
            updateNotificationDto
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post(':coachid/notifications/:notificationid')
    removeNotification(
        @User() user,
        @Param('coachid', ParseIntPipe) coachQueryId: number,
        @Param('notificationid', ParseIntPipe) notificationQueryId: number,
    ){
        return this.coachesService.removeNotification(
            user.type,
            user.id,
            coachQueryId,
            notificationQueryId
        );
    }

}
