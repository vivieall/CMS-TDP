import { Repository } from 'typeorm';
import { DispositivoEntity } from './dispositivo.entity';
export declare class DispositivoService {
    private dispositivoRepository;
    constructor(dispositivoRepository: Repository<DispositivoEntity>);
    findAll(): Promise<DispositivoEntity[]>;
    findOne(id: any): Promise<DispositivoEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
