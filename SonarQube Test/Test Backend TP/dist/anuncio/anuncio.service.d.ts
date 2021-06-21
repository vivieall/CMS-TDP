import { Repository } from 'typeorm';
import { AnuncioEntity } from './anuncio.entity';
export declare class AnuncioService {
    private anuncioRepository;
    constructor(anuncioRepository: Repository<AnuncioEntity>);
    findAll(): Promise<AnuncioEntity[]>;
    findByTipoId(id: any): Promise<AnuncioEntity[]>;
    findOne(id: any): Promise<AnuncioEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
