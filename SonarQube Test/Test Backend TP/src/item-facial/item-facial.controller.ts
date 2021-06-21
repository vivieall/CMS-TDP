/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemFacialEntity } from './item-facial.entity';
import { ItemFacialService } from './item-facial.service';

@ApiTags('item-facial')
@Controller('item')
export class ItemFacialController {
    constructor(private readonly itemFacialService: ItemFacialService) {}

    @Get()
    async findAll() {
      return this.itemFacialService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.itemFacialService.findOne(id);
    }
    @Post()
    async add(@Body() body: ItemFacialEntity) {
      return await this.itemFacialService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: ItemFacialEntity) {
      return this.itemFacialService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.itemFacialService.delete(id);
    }
}