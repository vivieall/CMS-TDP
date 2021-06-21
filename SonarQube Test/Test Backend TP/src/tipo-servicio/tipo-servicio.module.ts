import { Module } from '@nestjs/common';
import { TipoServicioController } from './tipo-servicio.controller';
import { TipoServicioEntity } from './tipo-servicio.entity';
import { TipoServicioService } from './tipo-servicio.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([TipoServicioEntity])],
    providers: [TipoServicioService],
    controllers: [TipoServicioController]
})
export class TipoServicioModule{}