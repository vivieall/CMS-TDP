/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguracionEntity } from './configuracion.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConfiguracionService{
    constructor(
        @InjectRepository(ConfiguracionEntity)
        private configuracionRepository: Repository<ConfiguracionEntity>
    ){}
    async findAll() {
        return this.configuracionRepository.find();
    }

    async findIdTipoConfiguracion(id){
        return this.configuracionRepository.find({where: { tipoconfiguracion : id}})
    }

    async findOne(id) {
        return this.configuracionRepository.findOne(id);
    }
    async add(body) {
        body.id = uuidv4();
        return this.configuracionRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.configuracionRepository.update({id:id}, body);
    }
    async delete(id) {
        return this.configuracionRepository.delete({id:id});
    }
}