import { Module } from '@nestjs/common';
import { DetalleTransaccionService } from './detalle-transaccion.service';
import { DetalleTransaccionController } from './detalle-transaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleTransaccionEntity } from './detalle-transaccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleTransaccionEntity])],
  providers: [DetalleTransaccionService],
  controllers: [DetalleTransaccionController]
})
export class DetalleTransaccionModule {}
