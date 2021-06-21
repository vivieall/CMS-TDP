import { TipoConfiguracionEntity } from './tipo-configuracion.entity';
import { TipoConfiguracionService } from './tipo-configuracion.service';
export declare class TipoConfiguracionController {
    private readonly tipoConfiguracionService;
    constructor(tipoConfiguracionService: TipoConfiguracionService);
    findAll(): Promise<TipoConfiguracionEntity[]>;
    findOne(id: string): Promise<TipoConfiguracionEntity>;
    add(body: TipoConfiguracionEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: TipoConfiguracionEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
