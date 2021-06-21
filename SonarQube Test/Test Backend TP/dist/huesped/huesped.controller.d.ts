import { HuespedEntity } from './huesped.entity';
import { HuespedService } from './huesped.service';
export declare class HuespedController {
    private readonly huespedService;
    constructor(huespedService: HuespedService);
    findAll(): Promise<HuespedEntity[]>;
    findOne(id: string): Promise<HuespedEntity>;
    add(body: HuespedEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: HuespedEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
