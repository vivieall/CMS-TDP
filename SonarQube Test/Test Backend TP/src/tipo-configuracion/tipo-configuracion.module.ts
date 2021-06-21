import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoConfiguracionController } from './tipo-configuracion.controller';
import { TipoConfiguracionEntity } from './tipo-configuracion.entity';
import { TipoConfiguracionService } from './tipo-configuracion.service';

@Module({
    imports: [TypeOrmModule.forFeature([TipoConfiguracionEntity])],
    providers: [TipoConfiguracionService],
    controllers: [TipoConfiguracionController]
})
export class  TipoConfiguracionModule{}  