import { Repository } from 'typeorm';
import { TipoConfiguracionEntity } from './tipo-configuracion.entity';
export declare class TipoConfiguracionService {
    private tipoConfiguracionRepository;
    constructor(tipoConfiguracionRepository: Repository<TipoConfiguracionEntity>);
    findAll(): Promise<TipoConfiguracionEntity[]>;
    findOne(id: any): Promise<TipoConfiguracionEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
