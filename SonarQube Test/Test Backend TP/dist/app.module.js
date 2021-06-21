"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const contenido_module_1 = require("./contenido/contenido.module");
const administrador_module_1 = require("./administrador/administrador.module");
const grupo_contenido_module_1 = require("./grupo-contenido/grupo-contenido.module");
const tipo_servicio_module_1 = require("./tipo-servicio/tipo-servicio.module");
const typeorm_1 = require("@nestjs/typeorm");
const amenitie_module_1 = require("./amenitie/amenitie.module");
const tipo_amenitie_module_1 = require("./tipo-amenitie/tipo-amenitie.module");
const huesped_module_1 = require("./huesped/huesped.module");
const reserva_servicio_module_1 = require("./reserva-servicio/reserva-servicio.module");
const servicio_module_1 = require("./servicio/servicio.module");
const dotenv = require("dotenv");
const detalle_servicio_module_1 = require("./detalle-servicio/detalle-servicio.module");
const asignacion_contenido_module_1 = require("./asignacion-contenido/asignacion-contenido.module");
const tipo_anuncio_module_1 = require("./tipo-anuncio/tipo-anuncio.module");
const anuncio_module_1 = require("./anuncio/anuncio.module");
const asignacion_module_1 = require("./asignacion/asignacion.module");
const habitacion_module_1 = require("./habitacion/habitacion.module");
const checkin_module_1 = require("./checkin/checkin.module");
const item_transaccion_module_1 = require("./item-transaccion/item-transaccion.module");
const venta_module_1 = require("./venta/venta.module");
const detalle_transaccion_module_1 = require("./detalle-transaccion/detalle-transaccion.module");
const tipo_configuracion_module_1 = require("./tipo-configuracion/tipo-configuracion.module");
const configuracion_module_1 = require("./configuracion/configuracion.module");
const transaccion_module_1 = require("./transaccion/transaccion.module");
const tipo_transaccion_module_1 = require("./tipo-transaccion/tipo-transaccion.module");
const item_facial_module_1 = require("./item-facial/item-facial.module");
const motor_facial_module_1 = require("./motor-facial/motor-facial.module");
const dispositivo_module_1 = require("./dispositivo/dispositivo.module");
const result = dotenv.config();
let AppModule = class AppModule {
    constructor() {
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [contenido_module_1.ContenidoModule, administrador_module_1.AdministradorModule, grupo_contenido_module_1.GrupoContenidoModule, tipo_servicio_module_1.TipoServicioModule, servicio_module_1.ServicioModule,
            detalle_servicio_module_1.DetalleServicioModule, asignacion_contenido_module_1.AsignacionContenidoModule, tipo_anuncio_module_1.TipoAnuncioModule, anuncio_module_1.AnuncioModule, tipo_configuracion_module_1.TipoConfiguracionModule, item_facial_module_1.ItemFacialModule,
            motor_facial_module_1.MotorFacialModule,
            configuracion_module_1.ConfiguracionModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                autoLoadEntities: true,
                synchronize: true,
                logging: "all"
            }),
            amenitie_module_1.AmenitieModule,
            tipo_amenitie_module_1.TipoAmenitieModule,
            huesped_module_1.HuespedModule,
            reserva_servicio_module_1.ReservaServicioModule,
            asignacion_module_1.AsignacionModule,
            habitacion_module_1.HabitacionModule,
            checkin_module_1.CheckinModule,
            item_transaccion_module_1.ItemTransaccionModule,
            venta_module_1.VentaModule,
            detalle_transaccion_module_1.DetalleTransaccionModule,
            transaccion_module_1.TransaccionModule,
            tipo_transaccion_module_1.TipoTransaccionModule,
            dispositivo_module_1.DispositivoModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map