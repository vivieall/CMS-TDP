/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GrupoContenidoService } from './grupo-contenido.service';
import { GrupoContenidoEntity } from './grupo-contenido.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('grupo-contenido')
@Controller('grupo-contenido')
export class GrupoContenidoController {
    constructor(private readonly grupocontenidoService: GrupoContenidoService) {}

    @Get()
    async findAll() {
      return this.grupocontenidoService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.grupocontenidoService.findOne(id);
    }
    @Post()
    async add(@Body() body: GrupoContenidoEntity) {
      return await this.grupocontenidoService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: GrupoContenidoEntity) {
      return this.grupocontenidoService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.grupocontenidoService.delete(id);
    }
}
