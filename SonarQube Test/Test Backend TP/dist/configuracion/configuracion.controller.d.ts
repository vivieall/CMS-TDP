import { ConfiguracionEntity } from './configuracion.entity';
import { ConfiguracionService } from './configuracion.service';
export declare class ConfiguracionController {
    private readonly configuracionService;
    constructor(configuracionService: ConfiguracionService);
    findAll(): Promise<ConfiguracionEntity[]>;
    findOne(id: string): Promise<ConfiguracionEntity>;
    findTipo(id: string): Promise<ConfiguracionEntity[]>;
    add(body: ConfiguracionEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: ConfiguracionEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
