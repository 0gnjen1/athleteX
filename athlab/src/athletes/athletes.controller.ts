import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';

@Controller('athletes')
export class AthletesController {
  constructor(private readonly athletesService: AthletesService) {}

  @Post()
  async create(@Body() createAthleteDto: CreateAthleteDto) {
    return this.athletesService.create(createAthleteDto);
  }

  @Get()
  async findAll() {
    return await this.athletesService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.athletesService.findOne(+id);
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAthleteDto: UpdateAthleteDto) {
    return await this.athletesService.update(+id, updateAthleteDto);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.athletesService.remove(+id);
  }
  
  @Post(':athleteid/setcoach/:coachid')
  async setCoach(@Param('athleteid') athleteid: string, @Param('coachid') coachid: string,){
    return await this.athletesService.setCoach(+athleteid, +coachid);
  }

  @Post(':id/removecoach')
  async removeCoach(@Param('id') id: string){
    return await this.athletesService.removeCoach(+id);
  }

}
