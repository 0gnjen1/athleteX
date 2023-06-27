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
    if(req.user.type !== "admin") throw new UnauthorizedException();
    return await this.adminService.findAll(+page, +pgsize);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    if(req.user.type !== "admin") throw new UnauthorizedException();
    return await this.adminService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @Request() req) {
    if(req.user.type !== "admin") throw new UnauthorizedException();
    return await this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if(req.user.type !== "admin") throw new UnauthorizedException();
    return await this.adminService.remove(+id);
  }

}
