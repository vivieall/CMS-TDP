import { HabitacionEntity } from './habitacion.entity';
import { HabitacionService } from './habitacion.service';
export declare class HabitacionController {
    private readonly habitacionService;
    constructor(habitacionService: HabitacionService);
    findAll(active: boolean): Promise<HabitacionEntity[]>;
    findOne(id: string, active: boolean): Promise<HabitacionEntity>;
    add(body: HabitacionEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: HabitacionEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
