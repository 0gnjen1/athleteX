import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PagePipe } from 'src/pipes/pagination/page.pipe';
import { PageSizePipe } from 'src/pipes/pagination/page-size.pipe';

@Controller('notifications')
export class NotificationsController {

    constructor(private readonly notificationsService: NotificationsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create( @Req() req,
            @Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationsService.create(req.user.type, +req.user.id, createNotificationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(  @Req() req,
                    @Query('page', PagePipe) page: number,
                    @Query('pgsize', PageSizePipe) pgsize: number) {
        return await this.notificationsService.findAll(req.user.type, +req.user.id, page, pgsize);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(  @Req() req,
                    @Param('id', ParseIntPipe) queryId: number) {
        return await this.notificationsService.findOne(req.user.type, +req.user.id, queryId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(   @Req() req,
                    @Param('id', ParseIntPipe) queryId: number,
                    @Body() updateNotificationDto: UpdateNotificationDto) {
        return await this.notificationsService.update(req.user.type, +req.user.id, queryId, updateNotificationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove( @Req() req,
            @Param('id', ParseIntPipe) queryId: number) {
        return this.notificationsService.remove(req.user.type, +req.user.id, queryId);
    }

}
