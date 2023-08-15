import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjuriesService } from './injuries.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/decorators/users/user-from-req.decorator';
import { CreateInjuryDto } from 'src/dtos/injuries/create-injury.dto';
import { PagePipe } from 'src/pipes/pagination/page.pipe';
import { PageSizePipe } from 'src/pipes/pagination/page-size.pipe';
import { UpdateInjuryDto } from 'src/dtos/injuries/update-injury.dto';

@Controller('injuries')
export class InjuriesController {

    constructor(
        private readonly injuriesService: InjuriesService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllInjuries(
        @Query('page', PagePipe) page: number,
        @Query('pgsize', PageSizePipe) pgsize: number
    ){
        return await this.injuriesService.findAllInjuries(
            page,
            pgsize
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':injuryid')
    async findInjuryById(
        @Param('injuryid', ParseIntPipe) injuryQueryId: number
    ){
        return await this.injuriesService.findInjuryById(
            injuryQueryId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createInjury(
        @User() user,
        @Body() createInjuryDto: CreateInjuryDto
    ){  
        if(user.type !== "admin") throw new UnauthorizedException();
        return await this.injuriesService.createInjury(
            createInjuryDto.type
        );
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":injuryid")
    async updateInjury(
        @User() user,
        @Param('injuryid', ParseIntPipe) injuryQueryId: number,
        @Body() updateInjuryDto: UpdateInjuryDto
    ){
        if(user.type !== "admin") throw new UnauthorizedException();
        return await this.injuriesService.updateInjury(injuryQueryId, updateInjuryDto.type);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":injuryid")
    async removeInjury(
        @User() user,
        @Param('injuryid', ParseIntPipe) injuryQueryId: number,
    ){
        if(user.type !== "admin") throw new UnauthorizedException();
        await this.injuriesService.removeInjury(injuryQueryId);
    }

}
