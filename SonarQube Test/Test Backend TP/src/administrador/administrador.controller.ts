import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorEntity } from './administrador.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('administrador')
@Controller('administrador')
export class AdministradorController {
    constructor(private readonly administradorService: AdministradorService) { }

    @Get()
    async findAll() {
      const service = await this.administradorService.findAll();
      for (let i = 0; i < service.length; i++) {
        service[i].password = undefined
      }
      return service
      
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      const findOne =  await this.administradorService.findOne(id);
      findOne.password = undefined
      return findOne
    }
    @Post()
    async add(@Body() body: AdministradorEntity) {
      return await this.administradorService.add(body);
    }
    @Post('/login')
    async login(@Body() body: AdministradorEntity) {
      return await this.administradorService.login(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: AdministradorEntity) {
      return await this.administradorService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return await this.administradorService.delete(id);
    }

}
