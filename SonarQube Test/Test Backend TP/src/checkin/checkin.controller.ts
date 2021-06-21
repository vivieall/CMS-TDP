import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CheckinEntity } from './checkin.entity';
import { CheckinService } from './checkin.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('checkin')
@Controller('checkin')
export class CheckinController {
    constructor(private readonly checkinService: CheckinService) { }

    @Get()
    async findAll() {
      return this.checkinService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.checkinService.findOne(id);
    }
    @Post()
    async add(@Body() body: CheckinEntity) {
      return await this.checkinService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: CheckinEntity) {
      return this.checkinService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.checkinService.delete(id);
    }
}
