import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { TransaccionEntity } from './transaccion.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transaccion')
@Controller('transaccion')
export class TransaccionController{
    constructor(private readonly transaccionService: TransaccionService){}

    @Get()
    async findAll(){
        return await this.transaccionService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: string){
        return await this.transaccionService.findOne(id);
    }

    @Post()
    async add(@Body() body: TransaccionEntity){
        return await this.transaccionService.add(body);
    }

    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: TransaccionEntity){
        return await this.transaccionService.update(id,body);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string){
        return await this.transaccionService.delete(id);
    }
    
}