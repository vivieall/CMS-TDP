/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TipoServicioService } from './tipo-servicio.service';
import { TipoServicioEntity } from './tipo-servicio.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tipo-servicio')
@Controller('tipo-servicio')
export class TipoServicioController{

    constructor(private readonly tiposervicioService: TipoServicioService){}

    @Get()
    async findAll(){
        return this.tiposervicioService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string){
        return await this.tiposervicioService.findOne(id);
    }
    @Post()
    async add(@Body() body: TipoServicioEntity){
        return await this.tiposervicioService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: TipoServicioEntity){
        return await this.tiposervicioService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string){
        return await this.tiposervicioService.delete(id);
    }
}