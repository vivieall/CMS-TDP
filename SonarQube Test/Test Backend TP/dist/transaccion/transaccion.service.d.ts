import { Repository } from 'typeorm';
import { TransaccionEntity } from './transaccion.entity';
export declare class TransaccionService {
    private transaccionRepository;
    constructor(transaccionRepository: Repository<TransaccionEntity>);
    findAll(): Promise<TransaccionEntity[]>;
    findOne(id: any): Promise<TransaccionEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
