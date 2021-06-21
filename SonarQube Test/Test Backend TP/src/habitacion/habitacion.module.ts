import { Module } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { HabitacionController } from './habitacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitacionEntity } from './habitacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HabitacionEntity])],
  providers: [HabitacionService],
  controllers: [HabitacionController],
  exports: [HabitacionService]
})
export class HabitacionModule {}
