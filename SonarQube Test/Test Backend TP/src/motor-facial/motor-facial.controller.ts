/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { MotorFacialEntity } from './motor-facial.entity';
import { MotorFacialService } from './motor-facial.service';

@ApiTags('motor-facial')
@Controller('ofertas')
export class MotorFacialController {
    constructor(private readonly motorFacialService: MotorFacialService) {}

    @Get()
    async findAll() {
      return this.motorFacialService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.motorFacialService.findOne(id);
    }

    @Post('/upload')
    @UseInterceptors(
      FileFieldsInterceptor(
        [
          {name: 'file', maxCount: 1},
        ]
      ),
    )
    async upload(@Body() body: MotorFacialEntity, @UploadedFiles() files){
      console.log(files,body);
      if(!files.file || !files.file[0]) throw new HttpException('File needed', 500);
      if(body.id){
        const newBody = JSON.parse(JSON.stringify(body))
        return await this.motorFacialService.uploadS3(newBody.id, files.file[0].buffer,newBody)
      }
      else{
        const newBody = JSON.parse(JSON.stringify(body))
        const res = await this.motorFacialService.add(newBody)
        if(res.identifiers[0]?.id){
          return await this.motorFacialService.uploadS3(res.identifiers[0].id,files.file[0].buffer)
        }
        throw new HttpException('Could not create object', 500);
      }
      
    }

    @Post()
    async add(@Body() body: MotorFacialEntity) {
      return await this.motorFacialService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: MotorFacialEntity) {
      return this.motorFacialService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.motorFacialService.delete(id);
    }
}