import { TipoAnuncioEntity } from './tipo-anuncio.entity';
import { TipoAnuncioService } from './tipo-anuncio.service';
export declare class TipoAnuncioController {
    private readonly tipoAnuncioService;
    constructor(tipoAnuncioService: TipoAnuncioService);
    findAll(): Promise<TipoAnuncioEntity[]>;
    findOne(id: string): Promise<TipoAnuncioEntity>;
    add(body: TipoAnuncioEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: TipoAnuncioEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
