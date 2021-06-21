import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AsignacionEntity } from './asignacion.entity';

@Injectable()
export class AsignacionService {
    constructor(
        @InjectRepository(AsignacionEntity)
        private asignacionRepository: Repository<AsignacionEntity>
    ){}

    async add(body){
        body.id= uuidv4();
        return this.asignacionRepository.insert(body);
    }
    async update(id,body){
        body.id=id;
        return this.asignacionRepository.update({id:id},body);
    }
    async delete(id){
        return this.asignacionRepository.delete({id:id});
    }
    async findAll(){
        return this.asignacionRepository.find();
    }
    async findOne(id){
        return this.asignacionRepository.findOne(id);
    }
}
