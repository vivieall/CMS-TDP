import { Repository } from 'typeorm';
import { MotorFacialEntity } from './motor-facial.entity';
import * as AWS from 'aws-sdk';
export declare class MotorFacialService {
    private motorFacialRepository;
    S3Service: AWS.S3;
    constructor(motorFacialRepository: Repository<MotorFacialEntity>);
    findAll(): Promise<MotorFacialEntity[]>;
    findOne(id: any): Promise<MotorFacialEntity>;
    add(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
    uploadS3(id: any, buffer: any, obj?: any): Promise<{
        url: string;
        id: any;
    }>;
}
