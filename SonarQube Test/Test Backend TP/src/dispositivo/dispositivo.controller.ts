import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DispositivoEntity } from './dispositivo.entity';
import { DispositivoService } from './dispositivo.service';

@ApiTags('dispositivo')
@Controller('dispositivo')
export class DispositivoController {
    constructor(private readonly dispositivoService: DispositivoService){}

    @Get()
    async findAll(){
        return await this.dispositivoService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id:string){
        return await this.dispositivoService.findOne(id);
    }

    @Post()
    async add(@Body() body:DispositivoEntity){
        return await this.dispositivoService.add(body);
    }

    @Put('/:id')
    async update(@Param('id')id:string,@Body() body:DispositivoEntity){
        return await this.dispositivoService.update(id,body);
    }

    @Delete('/:id')
    async delete(@Param('id') id:string){
        return await this.dispositivoService.delete(id);
    }
}
