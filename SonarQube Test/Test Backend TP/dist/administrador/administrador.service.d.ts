import { Repository } from 'typeorm';
import { AdministradorEntity } from './administrador.entity';
export declare class AdministradorService {
    private administradorsRepository;
    constructor(administradorsRepository: Repository<AdministradorEntity>);
    findAll(): Promise<AdministradorEntity[]>;
    findOne(id: any): Promise<AdministradorEntity>;
    add(body: AdministradorEntity): Promise<import("typeorm").InsertResult>;
    login(body: AdministradorEntity): Promise<{
        status: number;
        respuesta: string;
    }>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
