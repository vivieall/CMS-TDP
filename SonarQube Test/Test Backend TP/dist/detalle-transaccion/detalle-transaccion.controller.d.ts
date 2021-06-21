import { DetalleTransaccionEntity } from './detalle-transaccion.entity';
import { DetalleTransaccionService } from './detalle-transaccion.service';
export declare class DetalleTransaccionController {
    private readonly detalletransaccionService;
    constructor(detalletransaccionService: DetalleTransaccionService);
    findAll(): Promise<DetalleTransaccionEntity[]>;
    findOne(id: string): Promise<DetalleTransaccionEntity>;
    findByVentaId(id: string): Promise<DetalleTransaccionEntity[]>;
    add(body: DetalleTransaccionEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: DetalleTransaccionEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
