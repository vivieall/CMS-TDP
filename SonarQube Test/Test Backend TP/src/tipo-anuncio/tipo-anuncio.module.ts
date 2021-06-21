import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAnuncioController } from './tipo-anuncio.controller';
import { TipoAnuncioEntity } from './tipo-anuncio.entity';
import { TipoAnuncioService } from './tipo-anuncio.service';

@Module({
    imports: [TypeOrmModule.forFeature([TipoAnuncioEntity])],
    providers: [TipoAnuncioService],
    controllers: [TipoAnuncioController]
})
export class  TipoAnuncioModule{}  