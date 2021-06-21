/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DetalleServicioEntity } from './detalle-servicio.entity';

@Injectable()
export class DetalleServicioService{
    constructor(
        @InjectRepository(DetalleServicioEntity)
        private detalleServicioRepository: Repository<DetalleServicioEntity>,
    ){}

    async findIdServicio(id){
        return this.detalleServicioRepository.find({where: {servicio: id}})
    }

    async findOne(id){
        return this.detalleServicioRepository.findOne(id, {relations: ["servicio"]})
    }

    async add(body){
        body.id = uuidv4();
        return this.detalleServicioRepository.insert(body);
    }

    async update(id,body){
        body.id = id;
        return this.detalleServicioRepository.update({id: id},body);
    }

    async delete(id){
        return this.detalleServicioRepository.delete({id: id});
    }
}