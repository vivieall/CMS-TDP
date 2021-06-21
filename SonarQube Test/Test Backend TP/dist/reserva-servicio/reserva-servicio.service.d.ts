import { Repository } from 'typeorm';
import { ReservaServicioEntity } from './reserva-servicio.entity';
export declare class ReservaServicioService {
    private grupocontenidosRepository;
    constructor(grupocontenidosRepository: Repository<ReservaServicioEntity>);
    findAll(): Promise<ReservaServicioEntity[]>;
    findOne(id: any): Promise<ReservaServicioEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
