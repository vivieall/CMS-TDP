import { ItemTransaccionEntity } from './item-transaccion.entity';
import { ItemTransaccionService } from './item-transaccion.service';
export declare class ItemTransaccionController {
    private readonly itemtransaccionService;
    constructor(itemtransaccionService: ItemTransaccionService);
    findAll(): Promise<ItemTransaccionEntity[]>;
    findOne(id: string): Promise<ItemTransaccionEntity>;
    findByTransaccionId(id: string): Promise<ItemTransaccionEntity[]>;
    add(body: ItemTransaccionEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: ItemTransaccionEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
