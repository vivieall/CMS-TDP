import { Repository } from 'typeorm';
import { DetalleServicioEntity } from './detalle-servicio.entity';
export declare class DetalleServicioService {
    private detalleServicioRepository;
    constructor(detalleServicioRepository: Repository<DetalleServicioEntity>);
    findIdServicio(id: any): Promise<DetalleServicioEntity[]>;
    findOne(id: any): Promise<DetalleServicioEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
