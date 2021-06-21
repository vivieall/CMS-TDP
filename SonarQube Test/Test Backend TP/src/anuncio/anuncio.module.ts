import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnuncioController } from './anuncio.controller';
import { AnuncioEntity } from './anuncio.entity';
import { AnuncioService } from './anuncio.service';

@Module({
    imports: [TypeOrmModule.forFeature([AnuncioEntity])],
    providers: [AnuncioService],
    controllers: [AnuncioController]
})
export class  AnuncioModule{}  