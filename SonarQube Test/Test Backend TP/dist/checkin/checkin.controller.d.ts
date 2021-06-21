import { CheckinEntity } from './checkin.entity';
import { CheckinService } from './checkin.service';
export declare class CheckinController {
    private readonly checkinService;
    constructor(checkinService: CheckinService);
    findAll(): Promise<CheckinEntity[]>;
    findOne(id: string): Promise<CheckinEntity>;
    add(body: CheckinEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: CheckinEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
