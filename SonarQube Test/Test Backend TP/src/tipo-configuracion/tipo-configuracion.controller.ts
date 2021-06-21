/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TipoConfiguracionEntity } from './tipo-configuracion.entity';
import { TipoConfiguracionService } from './tipo-configuracion.service';

@ApiTags('tipo-configuracion')
@Controller('tipo-configuracion')
export class TipoConfiguracionController {
    constructor(private readonly tipoConfiguracionService: TipoConfiguracionService) {}

    @Get()
    async findAll() {
      return this.tipoConfiguracionService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.tipoConfiguracionService.findOne(id);
    }
    @Post()
    async add(@Body() body: TipoConfiguracionEntity) {
      return await this.tipoConfiguracionService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: TipoConfiguracionEntity) {
      return this.tipoConfiguracionService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.tipoConfiguracionService.delete(id);
    }
}