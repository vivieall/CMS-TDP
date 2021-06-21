import { AnuncioEntity } from './anuncio.entity';
import { AnuncioService } from './anuncio.service';
export declare class AnuncioController {
    private readonly anuncioService;
    constructor(anuncioService: AnuncioService);
    findAll(): Promise<AnuncioEntity[]>;
    findBytipoId(id: string): Promise<AnuncioEntity[]>;
    findOne(id: string): Promise<AnuncioEntity>;
    add(body: AnuncioEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: AnuncioEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
