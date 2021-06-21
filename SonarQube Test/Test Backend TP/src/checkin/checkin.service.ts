import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckinEntity } from './checkin.entity';
import { v4 as uuidv4 } from 'uuid';
import { HabitacionService } from 'src/habitacion/habitacion.service';

@Injectable()
export class CheckinService{
    constructor(
        @InjectRepository(CheckinEntity)
        private checkinRepository: Repository<CheckinEntity>,
        private readonly habitacionService: HabitacionService
    ){}
    async findAll() {
        return this.checkinRepository.find({relations:["venta","huesped","habitacion"]});
    }
    async findOne(id) {
        return this.checkinRepository.findOne(id,{relations:["venta","huesped","habitacion"]});
    }
    async add(body) {
        body.id = uuidv4();
        if(body.habitacion){
            let updateHabitacion = {
                activo: false
            }
            this.habitacionService.update(body.habitacion,updateHabitacion)
        }
        return this.checkinRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        let antiguaHabitacion = JSON.parse(JSON.stringify(body)).antiguaHabitacion
        delete body.antiguaHabitacion
        if(antiguaHabitacion && body.habitacion){
            let updateAntiguaHabitacion = {
                activo: true
            }
            this.habitacionService.update(antiguaHabitacion,updateAntiguaHabitacion)
            let updateHabitacion = {
                activo: false
            }
            this.habitacionService.update(body.habitacion,updateHabitacion)
        }
        return this.checkinRepository.update({id:id}, body);
    }
    async delete(id) {
        let res = await this.findOne(id)
        if(res){
            this.habitacionService.update(res.habitacion.id,{
                activo:true
            })
        }
        return this.checkinRepository.delete({id:id});
    }
}