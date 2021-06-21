import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservaServicioEntity } from './reserva-servicio.entity';
import { ReservaServicioService } from './reserva-servicio.service';

@ApiTags('reserva-servicio')
@Controller('reserva-servicio')
export class ReservaServicioController {
    constructor(private readonly reservaservicioService: ReservaServicioService) { }

    @Get()
    async findAll() {
      return this.reservaservicioService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.reservaservicioService.findOne(id);
    }
    @Post()
    async add(@Body() body: ReservaServicioEntity) {
      return await this.reservaservicioService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: ReservaServicioEntity) {
      return this.reservaservicioService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.reservaservicioService.delete(id);
    }
}

