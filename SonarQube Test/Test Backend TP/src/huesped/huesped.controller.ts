import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HuespedEntity } from './huesped.entity';
import { HuespedService } from './huesped.service';

@ApiTags('huesped')
@Controller('huesped')
export class HuespedController {
    constructor(private readonly huespedService: HuespedService) { }

    @Get()
    async findAll() {
      return this.huespedService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.huespedService.findOne(id);
    }
    @Post()
    async add(@Body() body: HuespedEntity) {
      return await this.huespedService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: HuespedEntity) {
      return this.huespedService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.huespedService.delete(id);
    }
}
