import { Module } from '@nestjs/common';
import { DispositivoService } from './dispositivo.service';
import { DispositivoController } from './dispositivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispositivoEntity } from './dispositivo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DispositivoEntity])],
  providers: [DispositivoService],
  controllers: [DispositivoController]
})
export class DispositivoModule {}
