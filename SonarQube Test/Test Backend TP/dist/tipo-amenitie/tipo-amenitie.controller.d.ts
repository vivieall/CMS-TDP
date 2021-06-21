import { TipoAmenitieEntity } from './tipo-amenitie.entity';
import { TipoAmenitieService } from './tipo-amenitie.service';
export declare class TipoAmenitieController {
    private readonly tipoamenitieService;
    constructor(tipoamenitieService: TipoAmenitieService);
    findAll(): Promise<TipoAmenitieEntity[]>;
    findOne(id: string): Promise<TipoAmenitieEntity>;
    add(body: TipoAmenitieEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: TipoAmenitieEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
