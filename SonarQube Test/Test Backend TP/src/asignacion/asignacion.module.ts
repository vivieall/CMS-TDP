import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionController } from './asignacion.controller';
import { AsignacionEntity } from './asignacion.entity';
import { AsignacionService } from './asignacion.service';

@Module({
    imports: [TypeOrmModule.forFeature([AsignacionEntity])],
    controllers: [AsignacionController],
    providers: [AsignacionService],
    exports: [AsignacionService]
})
export class AsignacionModule {}
