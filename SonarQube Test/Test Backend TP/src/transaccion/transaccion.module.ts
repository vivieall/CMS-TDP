import { Module } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionEntity } from './transaccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransaccionEntity])],
  providers: [TransaccionService],
  controllers: [TransaccionController]
})
export class TransaccionModule {}
