import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ReservaServicioEntity } from './reserva-servicio.entity';

@Injectable()
export class ReservaServicioService {
    constructor(
        @InjectRepository(ReservaServicioEntity)
        private grupocontenidosRepository: Repository<ReservaServicioEntity>,
    ) { }
    async findAll() {
        return this.grupocontenidosRepository.find({relations:["huesped"]});

    }
    async findOne(id) {
        return this.grupocontenidosRepository.findOne(id,{relations: ["huesped"]});
    }
    async add(body) {
        body.id = uuidv4(); 
        return this.grupocontenidosRepository.insert(body);
    }
    async update(id, body) {
        delete body.id
        return  this.grupocontenidosRepository.update({id:id},body)
    }
    async delete(id) {
        return this.grupocontenidosRepository.delete({id:id})

    }
}
