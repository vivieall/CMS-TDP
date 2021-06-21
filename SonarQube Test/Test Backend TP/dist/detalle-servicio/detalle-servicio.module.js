"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleServicioModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const detalle_servicio_controller_1 = require("./detalle-servicio.controller");
const detalle_servicio_entity_1 = require("./detalle-servicio.entity");
const detalle_servicio_service_1 = require("./detalle-servicio.service");
let DetalleServicioModule = class DetalleServicioModule {
};
DetalleServicioModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([detalle_servicio_entity_1.DetalleServicioEntity])],
        providers: [detalle_servicio_service_1.DetalleServicioService],
        controllers: [detalle_servicio_controller_1.DetalleServicioController]
    })
], DetalleServicioModule);
exports.DetalleServicioModule = DetalleServicioModule;
//# sourceMappingURL=detalle-servicio.module.js.map