import { Module } from '@nestjs/common';
import { ItemTransaccionService } from './item-transaccion.service';
import { ItemTransaccionController } from './item-transaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTransaccionEntity } from './item-transaccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemTransaccionEntity])],
  providers: [ItemTransaccionService],
  controllers: [ItemTransaccionController]
})
export class ItemTransaccionModule {}
