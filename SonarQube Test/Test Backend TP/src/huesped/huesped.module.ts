import { Module } from '@nestjs/common';
import { HuespedService } from './huesped.service';
import { HuespedController } from './huesped.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HuespedEntity } from './huesped.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HuespedEntity])],
  providers: [HuespedService],
  controllers: [HuespedController]
})
export class HuespedModule {}
