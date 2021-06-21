import { AdministradorService } from './administrador.service';
import { AdministradorEntity } from './administrador.entity';
export declare class AdministradorController {
    private readonly administradorService;
    constructor(administradorService: AdministradorService);
    findAll(): Promise<AdministradorEntity[]>;
    findOne(id: string): Promise<AdministradorEntity>;
    add(body: AdministradorEntity): Promise<import("typeorm").InsertResult>;
    login(body: AdministradorEntity): Promise<{
        status: number;
        respuesta: string;
    }>;
    update(id: string, body: AdministradorEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
