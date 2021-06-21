/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ContenidoEntity } from './contenido.entity';
import { ContenidoService } from './contenido.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('contenido')
@Controller('contenido')
export class ContenidoController {
    constructor(private readonly contenidoService: ContenidoService) {}

    @Get()
    async findAll() {
      return this.contenidoService.findAll();
    }
    @Get('/generic')
    async findGeneric() {
      return await this.contenidoService.findGeneric();
    }
    @Get('/external')
    async findExternal() {
      return await this.contenidoService.findExternal();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.contenidoService.findOne(id);
    }

    @Post('/upload')
    @UseInterceptors(
      FileFieldsInterceptor(
        [
          { name: 'file', maxCount :1},
        ]
      ),
    )
    async upload(@Body() body: ContenidoEntity, @UploadedFiles() files) {
      console.log(files,body);
      if(!files.file||!files.file[0]) throw new HttpException('File needed', 500);
      if(body.id){
        const newBody = JSON.parse(JSON.stringify(body))
        return await this.contenidoService.uploadS3(newBody.id,files.file[0].buffer,newBody)
      }
      else{
        const newBody = JSON.parse(JSON.stringify(body))
        const res = await this.contenidoService.add(newBody)
        if(res.identifiers[0]?.id){
          return await this.contenidoService.uploadS3(res.identifiers[0].id,files.file[0].buffer)
        }
        throw new HttpException('Could not create object', 500);
      }
      //return  await this.contenidoService.add(body);
    }
  
  
    @Post()
    async add(@Body() body: ContenidoEntity) {
      return await this.contenidoService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: ContenidoEntity) {
      return await this.contenidoService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return await this.contenidoService.delete(id);
    }
}
