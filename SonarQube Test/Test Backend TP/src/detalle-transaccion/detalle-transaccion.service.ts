import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleTransaccionEntity } from './detalle-transaccion.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DetalleTransaccionService{
    constructor(
        @InjectRepository(DetalleTransaccionEntity)
        private detalletransaccionRepository: Repository<DetalleTransaccionEntity>
    ){}
    async findAll() {
        return this.detalletransaccionRepository.find({relations:["itemTransaccion"]});
    }
    async findOne(id) {
        return this.detalletransaccionRepository.findOne(id,{relations:["itemTransaccion"]});
    }
    async findByVentaId(id) {
        return this.detalletransaccionRepository.find({relations:["itemTransaccion"],where:{venta:id}});
    }
    async add(body) {
        body.id = uuidv4();
        return this.detalletransaccionRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.detalletransaccionRepository.update({id:id}, body);
    }
    async delete(id) {
        return this.detalletransaccionRepository.delete({id:id});
    }
}