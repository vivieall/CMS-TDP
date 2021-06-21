import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionController } from './configuracion.controller';
import { ConfiguracionEntity } from './configuracion.entity';
import { ConfiguracionService } from './configuracion.service';

@Module({
    imports: [TypeOrmModule.forFeature([ConfiguracionEntity])],
    providers: [ConfiguracionService],
    controllers: [ConfiguracionController]
})
export class  ConfiguracionModule{}  