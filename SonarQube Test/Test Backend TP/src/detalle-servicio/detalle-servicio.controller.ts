/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DetalleServicioEntity } from './detalle-servicio.entity';
import { DetalleServicioService } from './detalle-servicio.service';

@ApiTags('detalle-servicio')
@Controller('detalle-servicio')
export class DetalleServicioController{
    constructor(private readonly detalleServicioService: DetalleServicioService){}

    @Get('/idservicio/:id')
    async findAll(@Param('id') id:string){
        return await this.detalleServicioService.findIdServicio(id);
    }

    @Get('/:id')
    async findOne(@Param('id') id:string){
        return await this.detalleServicioService.findOne(id);
    }

    @Post()
    async add(@Body() body:DetalleServicioEntity){
        return await this.detalleServicioService.add(body);
    }

    @Put('/:id')
    async update(@Param('id') id:string, @Body() body:DetalleServicioEntity){
        return await this.detalleServicioService.update(id, body);
    }

    @Delete('/:id')
    async delete(@Param('id') id:string){
        return await this.detalleServicioService.delete(id);
    }
}