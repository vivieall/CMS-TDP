/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ServicioEntity } from './servicio.entity';

@Injectable()
export class ServicioService{
    constructor(
        @InjectRepository(ServicioEntity)
        private servicioRepository: Repository<ServicioEntity>,
    ){}

    // async findAllTipo(){
    //     return this.servicioRepository.find()
    // }

    async findIdTipoServicio(id){
        return this.servicioRepository.find({where: { tiposervicio : id}})
    }
    
    async findOne(id){
        return this.servicioRepository.findOne(id, {relations: ["tiposervicio","detalleservicio","reservaServicio"]});
    }
    async add(body){
        body.id = uuidv4();
        return this.servicioRepository.insert(body);
    }
    async update(id,body){
        body.id=id;
        return this.servicioRepository.update({id:id}, body);
    }
    async delete(id){
        return this.servicioRepository.delete({id:id});
    }
}