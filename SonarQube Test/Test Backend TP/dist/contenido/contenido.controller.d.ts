import { ContenidoEntity } from './contenido.entity';
import { ContenidoService } from './contenido.service';
export declare class ContenidoController {
    private readonly contenidoService;
    constructor(contenidoService: ContenidoService);
    findAll(): Promise<ContenidoEntity[]>;
    findGeneric(): Promise<ContenidoEntity[]>;
    findExternal(): Promise<{
        PersonaObject: {
            nombre: string;
        };
        ofertasArray: any[];
    } | {
        PersonaObject?: undefined;
        ofertasArray?: undefined;
    }>;
    findOne(id: string): Promise<ContenidoEntity>;
    upload(body: ContenidoEntity, files: any): Promise<{
        url: string;
        id: any;
    }>;
    add(body: ContenidoEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: ContenidoEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
