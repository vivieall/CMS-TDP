import { AsignacionEntity } from './asignacion.entity';
import { AsignacionService } from './asignacion.service';
export declare class AsignacionController {
    private readonly asignacionService;
    constructor(asignacionService: AsignacionService);
    findAll(): Promise<AsignacionEntity[]>;
    findOne(id: string): Promise<AsignacionEntity>;
    add(body: AsignacionEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: AsignacionEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
