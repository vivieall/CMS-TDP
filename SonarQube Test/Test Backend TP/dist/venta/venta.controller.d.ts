import { VentaEntity } from './venta.entity';
import { VentaService } from './venta.service';
export declare class VentaController {
    private readonly ventaService;
    constructor(ventaService: VentaService);
    findAll(): Promise<VentaEntity[]>;
    findOne(id: string, huesped: boolean): Promise<VentaEntity>;
    findOneByTransaccion(id: string): Promise<VentaEntity[]>;
    add(body: VentaEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: VentaEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
