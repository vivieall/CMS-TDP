import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAmenitieEntity } from './tipo-amenitie.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TipoAmenitieService {
    constructor(
        @InjectRepository(TipoAmenitieEntity)
        private tipoAmenitieRepository: Repository<TipoAmenitieEntity>,
    ) { }
    async findAll() {
        return this.tipoAmenitieRepository.find();

    }
    async findOne(id) {
        return this.tipoAmenitieRepository.findOne(id);

    }
    async add(body) {
        body.id = uuidv4(); 
        return this.tipoAmenitieRepository.insert(body);
    }
    async update(id, body) {
        delete body.id
        return  this.tipoAmenitieRepository.update({id:id},body)
    }
    async delete(id) {
        return this.tipoAmenitieRepository.delete({id:id})
    }
}
