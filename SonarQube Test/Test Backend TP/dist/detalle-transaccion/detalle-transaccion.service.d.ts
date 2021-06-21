import { Repository } from 'typeorm';
import { DetalleTransaccionEntity } from './detalle-transaccion.entity';
export declare class DetalleTransaccionService {
    private detalletransaccionRepository;
    constructor(detalletransaccionRepository: Repository<DetalleTransaccionEntity>);
    findAll(): Promise<DetalleTransaccionEntity[]>;
    findOne(id: any): Promise<DetalleTransaccionEntity>;
    findByVentaId(id: any): Promise<DetalleTransaccionEntity[]>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
