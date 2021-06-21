/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TipoAnuncioEntity } from './tipo-anuncio.entity';
import { TipoAnuncioService } from './tipo-anuncio.service';

@ApiTags('tipo-anuncio')
@Controller('tipo-anuncio')
export class TipoAnuncioController {
    constructor(private readonly tipoAnuncioService: TipoAnuncioService) {}

    @Get()
    async findAll() {
      return this.tipoAnuncioService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.tipoAnuncioService.findOne(id);
    }
    @Post()
    async add(@Body() body: TipoAnuncioEntity) {
      return await this.tipoAnuncioService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: TipoAnuncioEntity) {
      return this.tipoAnuncioService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.tipoAnuncioService.delete(id);
    }
}