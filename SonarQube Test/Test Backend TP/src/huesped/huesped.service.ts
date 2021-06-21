import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { HuespedEntity } from './huesped.entity';

@Injectable()
export class HuespedService {
    constructor(
        @InjectRepository(HuespedEntity)
        private grupocontenidosRepository: Repository<HuespedEntity>,
    ) { }
    async findAll() {
        return this.grupocontenidosRepository.find();

    }
    async findOne(id) {
        return this.grupocontenidosRepository.findOne(id);

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
