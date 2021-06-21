import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaEntity } from './venta.entity';
import { CheckinModule } from 'src/checkin/checkin.module';

@Module({
  imports: [TypeOrmModule.forFeature([VentaEntity]), CheckinModule],
  providers: [VentaService],
  controllers: [VentaController]
})
export class VentaModule {}
