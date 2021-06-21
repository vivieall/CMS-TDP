import { Repository } from 'typeorm';
import { AsignacionEntity } from './asignacion.entity';
export declare class AsignacionService {
    private asignacionRepository;
    constructor(asignacionRepository: Repository<AsignacionEntity>);
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
    findAll(): Promise<AsignacionEntity[]>;
    findOne(id: any): Promise<AsignacionEntity>;
}
