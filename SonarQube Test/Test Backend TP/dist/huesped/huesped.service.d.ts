import { Repository } from 'typeorm';
import { HuespedEntity } from './huesped.entity';
export declare class HuespedService {
    private grupocontenidosRepository;
    constructor(grupocontenidosRepository: Repository<HuespedEntity>);
    findAll(): Promise<HuespedEntity[]>;
    findOne(id: any): Promise<HuespedEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
