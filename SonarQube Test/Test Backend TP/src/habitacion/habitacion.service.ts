import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitacionEntity } from './habitacion.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HabitacionService{
    constructor(
        @InjectRepository(HabitacionEntity)
        private habitacionRepository: Repository<HabitacionEntity>
    ){}
    async findAll(active:boolean) {
        return this.habitacionRepository.find({where:{activo:active}});
    }
    async findOne(id,active:boolean) {
        return this.habitacionRepository.findOne(id,{where:{activo:active}});
    }
    async add(body) {
        body.id = uuidv4();
        return this.habitacionRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.habitacionRepository.update({id:id}, body);
    }
    async delete(id) {
        return this.habitacionRepository.delete({id:id});
    }
}