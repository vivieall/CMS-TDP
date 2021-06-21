import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VentaEntity } from './venta.entity';
import { v4 as uuidv4 } from 'uuid';
import { TransaccionEntity } from 'src/transaccion/transaccion.entity';
import { CheckinService } from 'src/checkin/checkin.service';

@Injectable()
export class VentaService {
    constructor(
        @InjectRepository(VentaEntity)
        private ventaRepository: Repository<VentaEntity>,
        private checkinService: CheckinService
    ) { }
    async findAll() {
        return this.ventaRepository.find({ "relations": ["detalleTransaccion","checkin"] });
    }
    async findOne(id) {
        return this.ventaRepository.findOne(id, { "relations": ["detalleTransaccion","checkin"] });
    }
    async findOneWithHuesped(id) {
        let res = await this.ventaRepository.findOne(id, { "relations": ["detalleTransaccion","checkin"] });
        let checkin = await this.checkinService.findOne(res.checkin.id)
        res.checkin = checkin
        return res
    }
    async findOneByTransaccion(id) {
        return this.ventaRepository.find({ where: { transaccion: { id: id } } });
    }
    async add(body) {
        body.id = uuidv4();
        return this.ventaRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.ventaRepository.update({ id: id }, body);
    }
    async delete(id) {
        return this.ventaRepository.delete({ id: id });
    }
}