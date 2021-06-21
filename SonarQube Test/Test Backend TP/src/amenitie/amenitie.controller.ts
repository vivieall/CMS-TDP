import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AmenitieEntity } from './amenitie.entity';
import { AmenitieService } from './amenitie.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('amenitie')
@Controller('amenitie')
export class AmenitieController {
    constructor(private readonly amenitieService: AmenitieService) { }

    @Get()
    @ApiQuery({'name':'climate', 'required':false, example:'yes'})
    async findAll(@Query('climate') climate) {
      console.log(climate)
      return this.amenitieService.findAll(climate);
    }
    @Get('/:id')
    @ApiQuery({'name':'climate', 'required':false, example:'yes'})
    async findOne(@Param('id') id: string, @Query('climate') climate) {
      return await this.amenitieService.findOne(id, climate);
    }
    
    @Get('/tipo-amenitie/:id')
    async findOneByType(@Param('id') id: string) {
      return await this.amenitieService.findOneByType(id);
    }
    @Post()
    async add(@Body() body: AmenitieEntity) {
      return await this.amenitieService.add(body);
    }
    @Put('/:id')
    async update(@Param('id') id: string,@Body() body: AmenitieEntity) {
      return this.amenitieService.update(id,body);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
      return this.amenitieService.delete(id);
    }
}
