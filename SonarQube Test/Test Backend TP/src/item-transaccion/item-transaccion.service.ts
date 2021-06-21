import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemTransaccionEntity } from './item-transaccion.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ItemTransaccionService{
    constructor(
        @InjectRepository(ItemTransaccionEntity)
        private itemtransaccionRepository: Repository<ItemTransaccionEntity>
    ){}
    async findAll() {
        return this.itemtransaccionRepository.find();
    }
    async findOne(id) {
        return this.itemtransaccionRepository.findOne(id);
    }
    async findByTransaccionId(id) {
        return this.itemtransaccionRepository.find({where:{transaccion:id}});
    }
    async add(body) {
        body.id = uuidv4();
        return this.itemtransaccionRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.itemtransaccionRepository.update({id:id}, body);
    }
    async delete(id) {
        return this.itemtransaccionRepository.delete({id:id});
    }
}