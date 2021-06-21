import { Module } from '@nestjs/common';
import { AsignacionContenidoController } from './asignacion-contenido.controller';
import { AsignacionContenidoEntity } from './asignacion-contenido.entity';
import { AsignacionContenidoService } from './asignacion-contenido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionModule } from 'src/asignacion/asignacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([AsignacionContenidoEntity]),AsignacionModule],
  controllers: [AsignacionContenidoController],
  providers: [AsignacionContenidoService]
})
export class AsignacionContenidoModule { }