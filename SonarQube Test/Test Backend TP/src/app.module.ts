/* eslint-disable @typescript-eslint/no-empty-function */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContenidoModule } from './contenido/contenido.module';
import { AdministradorModule } from './administrador/administrador.module';
import { GrupoContenidoModule } from './grupo-contenido/grupo-contenido.module';
import { TipoServicioModule } from './tipo-servicio/tipo-servicio.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenitieModule } from './amenitie/amenitie.module';
import { TipoAmenitieModule } from './tipo-amenitie/tipo-amenitie.module';
import { HuespedModule } from './huesped/huesped.module';
import { ReservaServicioModule } from './reserva-servicio/reserva-servicio.module';
import { ServicioModule } from './servicio/servicio.module';
import * as dotenv from 'dotenv'
import { DetalleServicioModule } from './detalle-servicio/detalle-servicio.module';
import {AsignacionContenidoModule} from './asignacion-contenido/asignacion-contenido.module'
import { TipoAnuncioModule } from './tipo-anuncio/tipo-anuncio.module';
import { AnuncioModule } from './anuncio/anuncio.module';
import { AsignacionModule } from './asignacion/asignacion.module';
import { HabitacionModule } from './habitacion/habitacion.module';
import { CheckinModule } from './checkin/checkin.module';
import { ItemTransaccionModule } from './item-transaccion/item-transaccion.module';
import { VentaModule } from './venta/venta.module';
import { DetalleTransaccionModule } from './detalle-transaccion/detalle-transaccion.module';
import { TipoConfiguracionModule } from './tipo-configuracion/tipo-configuracion.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { TransaccionModule } from './transaccion/transaccion.module';
import { TipoTransaccionModule } from './tipo-transaccion/tipo-transaccion.module';
import { ItemFacialModule } from './item-facial/item-facial.module';
import { MotorFacialModule } from './motor-facial/motor-facial.module';
import { DispositivoModule } from './dispositivo/dispositivo.module';

const result = dotenv.config()

@Module({
  imports: [ContenidoModule, AdministradorModule, GrupoContenidoModule, TipoServicioModule, ServicioModule,
    DetalleServicioModule, AsignacionContenidoModule, TipoAnuncioModule, AnuncioModule, TipoConfiguracionModule,ItemFacialModule,
    MotorFacialModule,
    ConfiguracionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging:"all"
    }),
    AmenitieModule,
    TipoAmenitieModule,
    HuespedModule,
    ReservaServicioModule,
    AsignacionModule,
    HabitacionModule,
    CheckinModule,
    ItemTransaccionModule,
    VentaModule,
    DetalleTransaccionModule,
    TransaccionModule,
    TipoTransaccionModule,
    DispositivoModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){
  }
 }
