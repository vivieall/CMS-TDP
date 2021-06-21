import { MotorFacialEntity } from './motor-facial.entity';
import { MotorFacialService } from './motor-facial.service';
export declare class MotorFacialController {
    private readonly motorFacialService;
    constructor(motorFacialService: MotorFacialService);
    findAll(): Promise<MotorFacialEntity[]>;
    findOne(id: string): Promise<MotorFacialEntity>;
    upload(body: MotorFacialEntity, files: any): Promise<{
        url: string;
        id: any;
    }>;
    add(body: MotorFacialEntity): Promise<import("typeorm").InsertResult>;
    update(id: string, body: MotorFacialEntity): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
