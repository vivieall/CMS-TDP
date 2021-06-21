import { Repository } from 'typeorm';
import { TipoAnuncioEntity } from './tipo-anuncio.entity';
export declare class TipoAnuncioService {
    private tipoanunciosRepository;
    constructor(tipoanunciosRepository: Repository<TipoAnuncioEntity>);
    findAll(): Promise<TipoAnuncioEntity[]>;
    findOne(id: any): Promise<TipoAnuncioEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
