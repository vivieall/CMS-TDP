import { DispositivoEntity } from './dispositivo.entity';
import { DispositivoService } from './dispositivo.service';
export declare class DispositivoController {
    private readonly dispositivoService;
    constructor(dispositivoService: DispositivoService);
    findAll(): Promise<DispositivoEntity[]>;
    findOne(id: string): Promise<DispositivoEntity>;
    add(body: DispositivoEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: DispositivoEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
