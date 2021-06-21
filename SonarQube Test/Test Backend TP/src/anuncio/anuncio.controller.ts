/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnuncioEntity } from './anuncio.entity';
import { AnuncioService } from './anuncio.service';
@ApiTags('anuncio')
@Controller('anuncio')
export class AnuncioController {
    constructor(private readonly anuncioService: AnuncioService) {}

    @Get()
    async findAll() {
      return this.anuncioService.findAll();
    }
    @Get('/tipoid/:id')
    async findBytipoId(@Param('id') id: string){
        return await this.anuncioService.findByTipoId(id);
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.anuncioService.findOne(id);
    }
    @Post()
    async add(@Body() body: AnuncioEntity) {
      return await this.anuncioService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: AnuncioEntity) {
      return this.anuncioService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.anuncioService.delete(id);
    }
}