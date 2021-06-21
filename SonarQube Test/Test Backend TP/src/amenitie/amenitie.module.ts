import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenitieController } from './amenitie.controller';
import { AmenitieEntity } from './amenitie.entity';
import { AmenitieService } from './amenitie.service';

@Module({
  imports: [TypeOrmModule.forFeature([AmenitieEntity]),HttpModule],
  controllers: [AmenitieController],
  providers: [AmenitieService]
})
export class AmenitieModule {}
