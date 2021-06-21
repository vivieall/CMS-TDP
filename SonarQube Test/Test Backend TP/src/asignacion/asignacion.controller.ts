import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AsignacionEntity } from './asignacion.entity';
import { AsignacionService } from './asignacion.service';

@ApiTags('asignacion')
@Controller('asignacion')
export class AsignacionController {
    constructor(private readonly asignacionService: AsignacionService){}

    @Get()
    async findAll(){
        return await this.asignacionService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id:string){
        return await this.asignacionService.findOne(id);
    }

    @Post()
    async add(@Body() body:AsignacionEntity){
        return await this.asignacionService.add(body);
    }

    @Put('/:id')
    async update(@Param('id')id:string,@Body() body:AsignacionEntity){
        return await this.asignacionService.update(id,body);
    }

    @Delete('/:id')
    async delete(@Param('id') id:string){
        return await this.asignacionService.delete(id);
    }
}
