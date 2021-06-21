import { Module } from '@nestjs/common';
import { GrupoContenidoService } from './grupo-contenido.service';
import { GrupoContenidoController } from './grupo-contenido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoContenidoEntity } from './grupo-contenido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoContenidoEntity])],
  providers: [GrupoContenidoService],
  controllers: [GrupoContenidoController]
})
export class GrupoContenidoModule {}