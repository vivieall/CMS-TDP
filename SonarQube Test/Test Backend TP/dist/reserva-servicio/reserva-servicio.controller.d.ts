import { ReservaServicioEntity } from './reserva-servicio.entity';
import { ReservaServicioService } from './reserva-servicio.service';
export declare class ReservaServicioController {
    private readonly reservaservicioService;
    constructor(reservaservicioService: ReservaServicioService);
    findAll(): Promise<ReservaServicioEntity[]>;
    findOne(id: string): Promise<ReservaServicioEntity>;
    add(body: ReservaServicioEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: ReservaServicioEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
