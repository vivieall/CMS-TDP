import { AsignacionContenidoEntity } from './asignacion-contenido.entity';
import { AsignacionContenidoService } from './asignacion-contenido.service';
export declare class AsignacionContenidoController {
    private readonly asignacionContenidoService;
    constructor(asignacionContenidoService: AsignacionContenidoService);
    findAll(): Promise<AsignacionContenidoEntity[]>;
    findbyidgrupo(id: string): Promise<AsignacionContenidoEntity[]>;
    findOne(id: string): Promise<AsignacionContenidoEntity>;
    add(body: AsignacionContenidoEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: AsignacionContenidoEntity): Promise<import("typeorm").UpdateResult>;
    updateContenidos(idgrupo: string, idasignacion: string): Promise<AsignacionContenidoEntity[]>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
