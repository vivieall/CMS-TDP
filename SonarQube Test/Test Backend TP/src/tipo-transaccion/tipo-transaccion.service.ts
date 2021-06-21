import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoTransaccionEntity } from './tipo-transaccion.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TipoTransaccionService{

    constructor(
        @InjectRepository(TipoTransaccionEntity)
        private tipotransaccionRepository : Repository<TipoTransaccionEntity>,
    ){ }

    async findAll(){
        return  this.tipotransaccionRepository.find({"relations":["transaccion"]});
    }

    async findOne(id){
        return this.tipotransaccionRepository.findOne(id,{"relations":["transaccion"]});
    }

    async add(body){
        body.id = uuidv4();
        return this.tipotransaccionRepository.insert(body);
    }

    async update(id,body){
        body.id = id;
        return this.tipotransaccionRepository.update({id:id},body);
    }

    async delete(id){
        return this.tipotransaccionRepository.delete({id:id});
    }
}