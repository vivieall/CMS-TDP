import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContenidoController } from './contenido.controller';
import { ContenidoEntity } from './contenido.entity';
import { ContenidoService } from './contenido.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContenidoEntity]),HttpModule],
  controllers: [ContenidoController],
  providers: [ContenidoService]
})
export class ContenidoModule { }
