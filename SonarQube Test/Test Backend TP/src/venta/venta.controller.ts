import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VentaEntity } from './venta.entity';
import { VentaService } from './venta.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('venta')
@Controller('venta')
export class VentaController {
    constructor(private readonly ventaService: VentaService) { }

    @Get()
    async findAll() {
      return this.ventaService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string, @Query('huesped') huesped:boolean) {
      if(huesped) return await this.ventaService.findOneWithHuesped(id)
      return await this.ventaService.findOne(id);
    }
    @Get('transaccion/:id')
    async findOneByTransaccion(@Param('id') id: string) {
      return await this.ventaService.findOneByTransaccion(id);
    }
    @Post()
    async add(@Body() body: VentaEntity) {
      return await this.ventaService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: VentaEntity) {
      return this.ventaService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.ventaService.delete(id);
    }
}
