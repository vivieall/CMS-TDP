import { DetalleServicioEntity } from './detalle-servicio.entity';
import { DetalleServicioService } from './detalle-servicio.service';
export declare class DetalleServicioController {
    private readonly detalleServicioService;
    constructor(detalleServicioService: DetalleServicioService);
    findAll(id: string): Promise<DetalleServicioEntity[]>;
    findOne(id: string): Promise<DetalleServicioEntity>;
    add(body: DetalleServicioEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: DetalleServicioEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
