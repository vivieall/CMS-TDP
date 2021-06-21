/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioEntity } from './servicio.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('servicio')
@Controller('servicio')
export class ServicioController{
    constructor(private readonly servicioService: ServicioService){}


    @Get('/idtiposervicio/:id')
    async findAll(@Param('id') id:string){
        return await this.servicioService.findIdTipoServicio(id);
    }

    @Get('/:id')
    async findOne(@Param('id') id: string){
        return await this.servicioService.findOne(id);
    }

    @Post()
    async add(@Body() body: ServicioEntity){
        return await this.servicioService.add(body);
    }

    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: ServicioEntity){
        return await this.servicioService.update(id,body);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string){
        return await this.servicioService.delete(id);
    }
    
}