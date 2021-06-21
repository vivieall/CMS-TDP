/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrupoContenidoEntity } from './grupo-contenido.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GrupoContenidoService {
    constructor(
        @InjectRepository(GrupoContenidoEntity)
        private grupocontenidosRepository: Repository<GrupoContenidoEntity>,
    ) { }
    async findAll() {
        return this.grupocontenidosRepository.find();
    }
    async findOne(id) {
        return this.grupocontenidosRepository.findOne(id, {relations: ["asignacioncontenido"]});
    }    
    async add(body) {
        body.id = uuidv4(); 
        return this.grupocontenidosRepository.insert(body);
    }
    async update(id, body) {
        body.id = id
        return  this.grupocontenidosRepository.update({id:id},body)
    } 
    async delete(id) {
        return this.grupocontenidosRepository.delete({id:id})
    }
}