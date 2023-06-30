import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('admin')
export class AdminController {
    
    constructor(private readonly adminService: AdminService) {}

    @Post()
    async create(@Body() createAdminDto: CreateAdminDto) {
        return await this.adminService.create(createAdminDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req, @Query('page') page, @Query('pgsize') pgsize) {
        return await this.adminService.findAll(req.user.type, +page, +pgsize);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') queryId: string, @Request() req) {
        return await this.adminService.findOne(req.user.type, +queryId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Request() req, @Param('id') queryId: string, @Body() updateAdminDto: UpdateAdminDto) {
        return await this.adminService.update(req.user.type, +queryId, updateAdminDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Request() req, @Param('id') queryId: string) {
        return await this.adminService.remove(req.user.type, +queryId);
    }

}
