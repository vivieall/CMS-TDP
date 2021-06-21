import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HabitacionEntity } from './habitacion.entity';
import { HabitacionService } from './habitacion.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('habitacion')
@Controller('habitacion')
export class HabitacionController {
    constructor(private readonly habitacionService: HabitacionService) { }

    @Get()
    async findAll(@Query('active') active:boolean) {
      if(active== undefined || active==null) active =true
      return this.habitacionService.findAll(active);
    }
    @Get('/:id')
    async findOne(@Param('id') id: string,@Query('active') active:boolean) {
      if(active== undefined || active==null) active =true
      return await this.habitacionService.findOne(id,active);
    }
    @Post()
    async add(@Body() body: HabitacionEntity) {
      return await this.habitacionService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: HabitacionEntity) {
      return this.habitacionService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.habitacionService.delete(id);
    }
}
