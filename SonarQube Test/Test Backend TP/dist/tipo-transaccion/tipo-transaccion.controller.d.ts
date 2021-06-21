import { TipoTransaccionService } from './tipo-transaccion.service';
import { TipoTransaccionEntity } from './tipo-transaccion.entity';
export declare class TipoTransaccionController {
    private readonly tipotransaccionService;
    constructor(tipotransaccionService: TipoTransaccionService);
    findAll(): Promise<TipoTransaccionEntity[]>;
    findOne(id: string): Promise<TipoTransaccionEntity>;
    add(body: TipoTransaccionEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: TipoTransaccionEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
