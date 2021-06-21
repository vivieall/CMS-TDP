import { Module } from '@nestjs/common';
import { ReservaServicioService } from './reserva-servicio.service';
import { ReservaServicioController } from './reserva-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaServicioEntity } from './reserva-servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaServicioEntity])],
  providers: [ReservaServicioService],
  controllers: [ReservaServicioController]
})
export class ReservaServicioModule {}
