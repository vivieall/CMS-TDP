import { TransaccionService } from './transaccion.service';
import { TransaccionEntity } from './transaccion.entity';
export declare class TransaccionController {
    private readonly transaccionService;
    constructor(transaccionService: TransaccionService);
    findAll(): Promise<TransaccionEntity[]>;
    findOne(id: string): Promise<TransaccionEntity>;
    add(body: TransaccionEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: TransaccionEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
