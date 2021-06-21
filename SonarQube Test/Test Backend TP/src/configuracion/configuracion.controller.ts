/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfiguracionEntity } from './configuracion.entity';
import { ConfiguracionService } from './configuracion.service';

@ApiTags('configuracion')
@Controller('configuracion')
export class ConfiguracionController {
    constructor(private readonly configuracionService: ConfiguracionService) {}

    @Get()
    async findAll() {
      return this.configuracionService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.configuracionService.findOne(id);
    }

    @Get('/tipoconfiguracion/:id')
    async findTipo(@Param('id') id:string) {
      return await this.configuracionService.findIdTipoConfiguracion(id);
    }

    @Post()
    async add(@Body() body: ConfiguracionEntity) {
      return await this.configuracionService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: ConfiguracionEntity) {
      return this.configuracionService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.configuracionService.delete(id);
    }
}