/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AsignacionContenidoEntity } from './asignacion-contenido.entity';
import { AsignacionContenidoService } from './asignacion-contenido.service';
@ApiTags('asignacion-contenido')
@Controller('asignacion-contenido')
export class AsignacionContenidoController{
    constructor(private readonly asignacionContenidoService: AsignacionContenidoService){}

    // @Get('/idservicio/:id')
    // async findAll(@Param('id') id:string){
    //     return await this.detalleServicioService.findIdServicio(id);
    // }
    
    @Get()
    async findAll(){
        return await this.asignacionContenidoService.findAllTipo();
    }

    @Get('idgrupo/:id')
    async findbyidgrupo(@Param('id') id:string){
        return await this.asignacionContenidoService.findByIdGrupo(id);
    }

    @Get('/:id')
    async findOne(@Param('id') id:string){
        return await this.asignacionContenidoService.findOne(id);
    }

    @Post()
    async add(@Body() body:AsignacionContenidoEntity){
        return await this.asignacionContenidoService.add(body);
    }

    @Put('/:id')
    async update(@Param('id') id:string, @Body() body:AsignacionContenidoEntity){
        return await this.asignacionContenidoService.update(id, body);
    }

    @Put('/:idgrupo/:idasignacion')
    async updateContenidos(@Param('idgrupo') idgrupo:string, @Param('idasignacion') idasignacion:string ){
        return await this.asignacionContenidoService.updateContenidos(idgrupo,idasignacion);
    }

    @Delete('/:id')
    async delete(@Param('id') id:string){
        return await this.asignacionContenidoService.delete(id);
    }
}