import { GrupoContenidoService } from './grupo-contenido.service';
import { GrupoContenidoEntity } from './grupo-contenido.entity';
export declare class GrupoContenidoController {
    private readonly grupocontenidoService;
    constructor(grupocontenidoService: GrupoContenidoService);
    findAll(): Promise<GrupoContenidoEntity[]>;
    findOne(id: string): Promise<GrupoContenidoEntity>;
    add(body: GrupoContenidoEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: GrupoContenidoEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
