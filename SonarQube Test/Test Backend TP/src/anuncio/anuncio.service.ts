/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnuncioEntity } from './anuncio.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AnuncioService{
    constructor(
        @InjectRepository(AnuncioEntity)
        private anuncioRepository: Repository<AnuncioEntity>
    ){}
    async findAll() {
        return this.anuncioRepository.find({relations: ["tipoanuncio"]});
    }
    async findByTipoId(id){
        return this.anuncioRepository.find({where: {tipoanuncio:id}})
    }
    async findOne(id) {
        return this.anuncioRepository.findOne(id,{relations: ["tipoanuncio"]});
    }
    async add(body) {
        body.id = uuidv4();
        return this.anuncioRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.anuncioRepository.update({id:id}, body);
    }
    async delete(id) {
        return this.anuncioRepository.delete({id:id});
    }
}