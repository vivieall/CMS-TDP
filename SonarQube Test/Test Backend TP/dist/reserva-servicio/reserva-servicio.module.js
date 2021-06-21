"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaServicioModule = void 0;
const common_1 = require("@nestjs/common");
const reserva_servicio_service_1 = require("./reserva-servicio.service");
const reserva_servicio_controller_1 = require("./reserva-servicio.controller");
const typeorm_1 = require("@nestjs/typeorm");
const reserva_servicio_entity_1 = require("./reserva-servicio.entity");
let ReservaServicioModule = class ReservaServicioModule {
};
ReservaServicioModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([reserva_servicio_entity_1.ReservaServicioEntity])],
        providers: [reserva_servicio_service_1.ReservaServicioService],
        controllers: [reserva_servicio_controller_1.ReservaServicioController]
    })
], ReservaServicioModule);
exports.ReservaServicioModule = ReservaServicioModule;
//# sourceMappingURL=reserva-servicio.module.js.map