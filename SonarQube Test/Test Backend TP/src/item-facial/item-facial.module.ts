import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemFacialController } from './item-facial.controller';
import { ItemFacialEntity } from './item-facial.entity';
import { ItemFacialService } from './item-facial.service';

@Module({
    imports: [TypeOrmModule.forFeature([ItemFacialEntity])],
    providers: [ItemFacialService],
    controllers: [ItemFacialController]
})
export class  ItemFacialModule{}  