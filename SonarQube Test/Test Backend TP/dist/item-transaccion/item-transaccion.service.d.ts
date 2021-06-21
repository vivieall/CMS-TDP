import { Repository } from 'typeorm';
import { ItemTransaccionEntity } from './item-transaccion.entity';
export declare class ItemTransaccionService {
    private itemtransaccionRepository;
    constructor(itemtransaccionRepository: Repository<ItemTransaccionEntity>);
    findAll(): Promise<ItemTransaccionEntity[]>;
    findOne(id: any): Promise<ItemTransaccionEntity>;
    findByTransaccionId(id: any): Promise<ItemTransaccionEntity[]>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
