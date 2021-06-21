import { Repository } from 'typeorm';
import { CheckinEntity } from './checkin.entity';
import { HabitacionService } from 'src/habitacion/habitacion.service';
export declare class CheckinService {
    private checkinRepository;
    private readonly habitacionService;
    constructor(checkinRepository: Repository<CheckinEntity>, habitacionService: HabitacionService);
    findAll(): Promise<CheckinEntity[]>;
    findOne(id: any): Promise<CheckinEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
