import { Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinEntity } from './checkin.entity';
import { HabitacionModule } from 'src/habitacion/habitacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([CheckinEntity]),HabitacionModule],
  providers: [CheckinService],
  exports: [CheckinService],
  controllers: [CheckinController]
})
export class CheckinModule {}
