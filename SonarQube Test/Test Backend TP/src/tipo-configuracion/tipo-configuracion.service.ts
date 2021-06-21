/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoConfiguracionEntity } from './tipo-configuracion.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TipoConfiguracionService{
    constructor(
        @InjectRepository(TipoConfiguracionEntity)
        private tipoConfiguracionRepository: Repository<TipoConfiguracionEntity>
    ){}
    async findAll() {
        return this.tipoConfiguracionRepository.find();
    }
    async findOne(id) {
        return this.tipoConfiguracionRepository.findOne(id);
    }
    async add(body) {
        body.id = uuidv4();
        return this.tipoConfiguracionRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.tipoConfiguracionRepository.update({id:id}, body);
    }
    async delete(id) {
        return this.tipoConfiguracionRepository.delete({id:id});
    }
}