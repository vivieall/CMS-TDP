/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAnuncioEntity } from './tipo-anuncio.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TipoAnuncioService{
    constructor(
        @InjectRepository(TipoAnuncioEntity)
        private tipoanunciosRepository: Repository<TipoAnuncioEntity>
    ){}
    async findAll() {
        return this.tipoanunciosRepository.find({relations: ["anuncio"]});
    }
    async findOne(id) {
        return this.tipoanunciosRepository.findOne(id,{relations: ["anuncio"]});
    }
    async add(body) {
        body.id = uuidv4();
        return this.tipoanunciosRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.tipoanunciosRepository.update({id:id}, body);
    }
    async delete(id) {
        return this.tipoanunciosRepository.delete({id:id});
    }
}