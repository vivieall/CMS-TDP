import { ServicioService } from './servicio.service';
import { ServicioEntity } from './servicio.entity';
export declare class ServicioController {
    private readonly servicioService;
    constructor(servicioService: ServicioService);
    findAll(id: string): Promise<ServicioEntity[]>;
    findOne(id: string): Promise<ServicioEntity>;
    add(body: ServicioEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: ServicioEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
