import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorFacialController } from './motor-facial.controller';
import { MotorFacialEntity } from './motor-facial.entity';
import { MotorFacialService } from './motor-facial.service';

@Module({
    imports: [TypeOrmModule.forFeature([MotorFacialEntity])],
    providers: [MotorFacialService],
    controllers: [MotorFacialController]
})
export class  MotorFacialModule{}  