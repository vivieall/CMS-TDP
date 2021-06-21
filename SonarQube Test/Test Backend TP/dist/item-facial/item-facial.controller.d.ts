import { ItemFacialEntity } from './item-facial.entity';
import { ItemFacialService } from './item-facial.service';
export declare class ItemFacialController {
    private readonly itemFacialService;
    constructor(itemFacialService: ItemFacialService);
    findAll(): Promise<ItemFacialEntity[]>;
    findOne(id: string): Promise<ItemFacialEntity>;
    add(body: ItemFacialEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: ItemFacialEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
