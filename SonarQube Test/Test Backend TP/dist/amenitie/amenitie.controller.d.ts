import { AmenitieEntity } from './amenitie.entity';
import { AmenitieService } from './amenitie.service';
export declare class AmenitieController {
    private readonly amenitieService;
    constructor(amenitieService: AmenitieService);
    findAll(climate: any): Promise<AmenitieEntity[]>;
    findOne(id: string, climate: any): Promise<AmenitieEntity>;
    findOneByType(id: string): Promise<AmenitieEntity[]>;
    add(body: AmenitieEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: AmenitieEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
