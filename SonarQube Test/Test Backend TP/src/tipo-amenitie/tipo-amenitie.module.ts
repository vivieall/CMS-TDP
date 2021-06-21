import { Module } from '@nestjs/common';
import { TipoAmenitieService } from './tipo-amenitie.service';
import { TipoAmenitieController } from './tipo-amenitie.controller';
import { TipoAmenitieEntity } from './tipo-amenitie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoAmenitieEntity])],
  providers: [TipoAmenitieService],
  controllers: [TipoAmenitieController]
})
export class TipoAmenitieModule {}
