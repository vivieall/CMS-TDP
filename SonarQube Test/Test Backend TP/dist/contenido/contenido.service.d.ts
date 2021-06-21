import { HttpService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ContenidoEntity } from './contenido.entity';
import * as AWS from 'aws-sdk';
export declare class ContenidoService {
    private contenidosRepository;
    private httpService;
    S3Service: AWS.S3;
    constructor(contenidosRepository: Repository<ContenidoEntity>, httpService: HttpService);
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
    findOne(id: any): Promise<ContenidoEntity>;
    add(body: ContenidoEntity): Promise<import("typeorm").InsertResult>;
    update(id: any, body: ContenidoEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
    uploadS3(id: any, buffer: any, obj?: any): Promise<{
        url: string;
        id: any;
    }>;
}
