import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from '../dtos/admins/create-admin.dto';
import { UpdateAdminDto } from '../dtos/admins/update-admin.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PagePipe } from 'src/pipes/pagination/page.pipe';
import { PageSizePipe } from 'src/pipes/pagination/page-size.pipe';
import { User } from 'src/decorators/users/user-from-req.decorator';

@Controller('admin')
export class AdminController {
    
    constructor(private readonly adminService: AdminService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(  @User() user,
                    @Query('page', PagePipe) page: number,
                    @Query('pgsize', PageSizePipe) pgsize: number) {
        return await this.adminService.findAll(user.type, page, pgsize);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(  @User() user,
                    @Param('id', ParseIntPipe) queryId: number) {
        return await this.adminService.findOne(user.type, queryId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(   @User() user,
                    @Param('id', ParseIntPipe) queryId: number,
                    @Body() updateAdminDto: UpdateAdminDto) {
        return await this.adminService.update(user.type, user.id, queryId, updateAdminDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(   @User() user,
                    @Param('id', ParseIntPipe) queryId: number) {
        return await this.adminService.remove(user.type, user.id, queryId);
    }

}
