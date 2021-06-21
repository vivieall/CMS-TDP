import { Module } from '@nestjs/common';
import { TipoTransaccionService } from './tipo-transaccion.service';
import { TipoTransaccionController } from './tipo-transaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTransaccionEntity } from './tipo-transaccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoTransaccionEntity])],
  providers: [TipoTransaccionService],
  controllers: [TipoTransaccionController]
})
export class TipoTransaccionModule {}
