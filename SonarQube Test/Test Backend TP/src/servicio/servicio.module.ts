import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioController } from './servicio.controller';
import { ServicioEntity } from './servicio.entity';
import { ServicioService } from './servicio.service';

@Module({
    imports: [TypeOrmModule.forFeature([ServicioEntity])],
    providers: [ServicioService],
    controllers: [ServicioController]
})
export class ServicioModule{}