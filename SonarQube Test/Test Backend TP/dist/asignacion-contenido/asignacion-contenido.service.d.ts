import { AsignacionService } from 'src/asignacion/asignacion.service';
import { Repository } from 'typeorm';
import { AsignacionContenidoEntity } from './asignacion-contenido.entity';
export declare class AsignacionContenidoService {
    private asignacionContenidoRepository;
    private asignacionService;
    constructor(asignacionContenidoRepository: Repository<AsignacionContenidoEntity>, asignacionService: AsignacionService);
    findAllTipo(): Promise<AsignacionContenidoEntity[]>;
    findByIdGrupo(id: any): Promise<AsignacionContenidoEntity[]>;
    findOne(id: any): Promise<AsignacionContenidoEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
    updateContenidos(idgrupo: any, idasignacion: any): Promise<AsignacionContenidoEntity[]>;
}
