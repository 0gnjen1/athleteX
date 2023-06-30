import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
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
    async findAll(  @Request() req,
                    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
                    @Query('pgsize', new DefaultValuePipe(10), ParseIntPipe) pgsize: number) {
        return await this.adminService.findAll(req.user.type, +page, +pgsize);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(  @Request() req,
                    @Param('id', ParseIntPipe) queryId: number) {
        return await this.adminService.findOne(req.user.type, queryId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(   @Request() req,
                    @Param('id', ParseIntPipe) queryId: number,
                    @Body() updateAdminDto: UpdateAdminDto) {
        return await this.adminService.update(req.user.type, queryId, updateAdminDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(   @Request() req,
                    @Param('id', ParseIntPipe) queryId: number) {
        return await this.adminService.remove(req.user.type, queryId);
    }

}
