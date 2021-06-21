import { Repository } from 'typeorm';
import { TipoServicioEntity } from './tipo-servicio.entity';
export declare class TipoServicioService {
    private tiposervicioRepository;
    constructor(tiposervicioRepository: Repository<TipoServicioEntity>);
    findAll(): Promise<TipoServicioEntity[]>;
    findOne(id: any): Promise<TipoServicioEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
