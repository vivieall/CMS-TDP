import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ItemTransaccionEntity } from './item-transaccion.entity';
import { ItemTransaccionService } from './item-transaccion.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('item-transaccion')
@Controller('item-transaccion')
export class ItemTransaccionController {
    constructor(private readonly itemtransaccionService: ItemTransaccionService) { }

    @Get()
    async findAll() {
      return this.itemtransaccionService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.itemtransaccionService.findOne(id);
    }
    @Get('/transaccion/:id')
    async findByTransaccionId(@Param('id') id: string) {
      return await this.itemtransaccionService.findByTransaccionId(id);
    }
    @Post()
    async add(@Body() body: ItemTransaccionEntity) {
      return await this.itemtransaccionService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: ItemTransaccionEntity) {
      return this.itemtransaccionService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.itemtransaccionService.delete(id);
    }
}
