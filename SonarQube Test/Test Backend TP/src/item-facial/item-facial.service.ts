/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemFacialEntity } from './item-facial.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ItemFacialService{
    constructor(
        @InjectRepository(ItemFacialEntity)
        private itemFacialRepository: Repository<ItemFacialEntity>
    ){}
    async findAll() {
        return this.itemFacialRepository.find();
    }
    async findOne(id) {
        return this.itemFacialRepository.findOne(id);
    }
    async add(body) {
        body.id = uuidv4();
        return this.itemFacialRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.itemFacialRepository.update({id:id}, body);
    }
    async delete(id) {
        return this.itemFacialRepository.delete({id:id});
    }
}