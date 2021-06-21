import { HttpService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AmenitieEntity } from './amenitie.entity';
export declare class AmenitieService {
    private amenitieRepository;
    private httpService;
    weatherApiKey: string;
    constructor(amenitieRepository: Repository<AmenitieEntity>, httpService: HttpService);
    findAll(climate?: any): Promise<AmenitieEntity[]>;
    findOne(id: any, climate?: any): Promise<AmenitieEntity>;
    findOneByType(tipoAmenitieID: any): Promise<AmenitieEntity[]>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
