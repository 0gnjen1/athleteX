import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('notifications')
export class NotificationsController {

    constructor(private readonly notificationsService: NotificationsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req, @Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationsService.create(req.user.type, req.user.id, createNotificationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req, @Query('page') page, @Query('pgsize') pgsize) {
        return await this.notificationsService.findAll(req.user.type, +req.user.id, +page, +pgsize);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Req() req, @Param('id') queryId: string) {
        return this.notificationsService.findOne(req.user.type, +req.user.id, +queryId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Req() req, @Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
        return await this.notificationsService.update(req.user.type, +req.user.id, +id, updateNotificationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Req() req, @Param('id') id: string) {
        return this.notificationsService.remove(req.user.type, +req.user.id, +id);
    }

}
