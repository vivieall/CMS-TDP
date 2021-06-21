import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TipoAmenitieEntity } from './tipo-amenitie.entity';
import { TipoAmenitieService } from './tipo-amenitie.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tipo-amenitie')
@Controller('tipo-amenitie')
export class TipoAmenitieController {
    constructor(private readonly tipoamenitieService: TipoAmenitieService) { }

    @Get()
    async findAll() {
      return this.tipoamenitieService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.tipoamenitieService.findOne(id);
    }
    @Post()
    async add(@Body() body: TipoAmenitieEntity) {
      return await this.tipoamenitieService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: TipoAmenitieEntity) {
      return this.tipoamenitieService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.tipoamenitieService.delete(id);
    }
}
