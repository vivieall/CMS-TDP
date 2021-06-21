import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoServicioEntity } from './tipo-servicio.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TipoServicioService{

    constructor(
        @InjectRepository(TipoServicioEntity)
        private tiposervicioRepository : Repository<TipoServicioEntity>,
    ){ }

    async findAll(){
        return  this.tiposervicioRepository.find({relations: ["servicios"]});
    }

    async findOne(id){
        return this.tiposervicioRepository.findOne(id,{relations: ["servicios"]});
    }

    async add(body){
        body.id = uuidv4();
        return this.tiposervicioRepository.insert(body);
    }

    async update(id,body){
        body.id = id;
        return this.tiposervicioRepository.update({id:id},body);
    }

    async delete(id){
        return this.tiposervicioRepository.delete({id:id});
    }
}