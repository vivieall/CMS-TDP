import { Repository } from 'typeorm';
import { TipoTransaccionEntity } from './tipo-transaccion.entity';
export declare class TipoTransaccionService {
    private tipotransaccionRepository;
    constructor(tipotransaccionRepository: Repository<TipoTransaccionEntity>);
    findAll(): Promise<TipoTransaccionEntity[]>;
    findOne(id: any): Promise<TipoTransaccionEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
