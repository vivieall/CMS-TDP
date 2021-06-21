import { Repository } from 'typeorm';
import { ConfiguracionEntity } from './configuracion.entity';
export declare class ConfiguracionService {
    private configuracionRepository;
    constructor(configuracionRepository: Repository<ConfiguracionEntity>);
    findAll(): Promise<ConfiguracionEntity[]>;
    findIdTipoConfiguracion(id: any): Promise<ConfiguracionEntity[]>;
    findOne(id: any): Promise<ConfiguracionEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
