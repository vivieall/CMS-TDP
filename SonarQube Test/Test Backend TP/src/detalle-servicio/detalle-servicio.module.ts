import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleServicioController } from './detalle-servicio.controller';
import { DetalleServicioEntity } from './detalle-servicio.entity';
import { DetalleServicioService } from './detalle-servicio.service';

@Module({
    imports:[TypeOrmModule.forFeature([DetalleServicioEntity])],
    providers: [DetalleServicioService],
    controllers: [DetalleServicioController]
})
export class DetalleServicioModule{}