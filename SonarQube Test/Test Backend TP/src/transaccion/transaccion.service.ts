import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionEntity } from './transaccion.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransaccionService{

    constructor(
        @InjectRepository(TransaccionEntity)
        private transaccionRepository : Repository<TransaccionEntity>,
    ){ }

    async findAll(){
        return  this.transaccionRepository.find({relations:['itemTransaccion']});
    }

    async findOne(id){
        return this.transaccionRepository.findOne(id,{relations:['itemTransaccion']});
    }

    async add(body){
        body.id = uuidv4();
        return this.transaccionRepository.insert(body);
    }

    async update(id,body){
        body.id = id;
        return this.transaccionRepository.update({id:id},body);
    }

    async delete(id){
        return this.transaccionRepository.delete({id:id});
    }
}