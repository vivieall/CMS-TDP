import { Repository } from 'typeorm';
import { ItemFacialEntity } from './item-facial.entity';
export declare class ItemFacialService {
    private itemFacialRepository;
    constructor(itemFacialRepository: Repository<ItemFacialEntity>);
    findAll(): Promise<ItemFacialEntity[]>;
    findOne(id: any): Promise<ItemFacialEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
