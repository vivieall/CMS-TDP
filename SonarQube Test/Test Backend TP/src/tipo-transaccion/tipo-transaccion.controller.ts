import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TipoTransaccionService } from './tipo-transaccion.service';
import { TipoTransaccionEntity } from './tipo-transaccion.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tipo-transaccion')
@Controller('tipo-transaccion')
export class TipoTransaccionController{
    constructor(private readonly tipotransaccionService: TipoTransaccionService){}

    @Get()
    async findAll(){
        return await this.tipotransaccionService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string){
        return await this.tipotransaccionService.findOne(id);
    }

    @Post()
    async add(@Body() body: TipoTransaccionEntity){
        return await this.tipotransaccionService.add(body);
    }

    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: TipoTransaccionEntity){
        return await this.tipotransaccionService.update(id,body);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string){
        return await this.tipotransaccionService.delete(id);
    }
    
}