import { Repository } from 'typeorm';
import { HabitacionEntity } from './habitacion.entity';
export declare class HabitacionService {
    private habitacionRepository;
    constructor(habitacionRepository: Repository<HabitacionEntity>);
    findAll(active: boolean): Promise<HabitacionEntity[]>;
    findOne(id: any, active: boolean): Promise<HabitacionEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
