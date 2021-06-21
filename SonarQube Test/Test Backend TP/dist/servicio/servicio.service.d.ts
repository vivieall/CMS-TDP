import { Repository } from 'typeorm';
import { ServicioEntity } from './servicio.entity';
export declare class ServicioService {
    private servicioRepository;
    constructor(servicioRepository: Repository<ServicioEntity>);
    findIdTipoServicio(id: any): Promise<ServicioEntity[]>;
    findOne(id: any): Promise<ServicioEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
