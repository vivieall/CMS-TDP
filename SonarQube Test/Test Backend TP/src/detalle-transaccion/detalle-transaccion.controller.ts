import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DetalleTransaccionEntity } from './detalle-transaccion.entity';
import { DetalleTransaccionService } from './detalle-transaccion.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('detalle-transaccion')
@Controller('detalletransaccion')
export class DetalleTransaccionController {
    constructor(private readonly detalletransaccionService: DetalleTransaccionService) { }

    @Get()
    async findAll() {
      return this.detalletransaccionService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.detalletransaccionService.findOne(id);
    }
    @Get('/venta/:id')
    async findByVentaId(@Param('id') id: string) {
      return await this.detalletransaccionService.findByVentaId(id);
    }
    @Post()
    async add(@Body() body: DetalleTransaccionEntity) {
      return await this.detalletransaccionService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: DetalleTransaccionEntity) {
      return this.detalletransaccionService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.detalletransaccionService.delete(id);
    }
}
