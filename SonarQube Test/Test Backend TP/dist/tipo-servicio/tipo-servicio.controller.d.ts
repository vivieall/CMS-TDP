import { TipoServicioService } from './tipo-servicio.service';
import { TipoServicioEntity } from './tipo-servicio.entity';
export declare class TipoServicioController {
    private readonly tiposervicioService;
    constructor(tiposervicioService: TipoServicioService);
    findAll(): Promise<TipoServicioEntity[]>;
    findOne(id: string): Promise<TipoServicioEntity>;
    add(body: TipoServicioEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: TipoServicioEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
