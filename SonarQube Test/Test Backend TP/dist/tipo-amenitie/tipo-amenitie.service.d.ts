import { Repository } from 'typeorm';
import { TipoAmenitieEntity } from './tipo-amenitie.entity';
export declare class TipoAmenitieService {
    private tipoAmenitieRepository;
    constructor(tipoAmenitieRepository: Repository<TipoAmenitieEntity>);
    findAll(): Promise<TipoAmenitieEntity[]>;
    findOne(id: any): Promise<TipoAmenitieEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
