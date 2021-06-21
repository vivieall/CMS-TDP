import { Repository } from 'typeorm';
import { GrupoContenidoEntity } from './grupo-contenido.entity';
export declare class GrupoContenidoService {
    private grupocontenidosRepository;
    constructor(grupocontenidosRepository: Repository<GrupoContenidoEntity>);
    findAll(): Promise<GrupoContenidoEntity[]>;
    findOne(id: any): Promise<GrupoContenidoEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
