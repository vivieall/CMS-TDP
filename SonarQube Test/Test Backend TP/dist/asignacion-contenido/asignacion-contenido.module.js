"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionContenidoModule = void 0;
const common_1 = require("@nestjs/common");
const asignacion_contenido_controller_1 = require("./asignacion-contenido.controller");
const asignacion_contenido_entity_1 = require("./asignacion-contenido.entity");
const asignacion_contenido_service_1 = require("./asignacion-contenido.service");
const typeorm_1 = require("@nestjs/typeorm");
const asignacion_module_1 = require("../asignacion/asignacion.module");
let AsignacionContenidoModule = class AsignacionContenidoModule {
};
AsignacionContenidoModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([asignacion_contenido_entity_1.AsignacionContenidoEntity]), asignacion_module_1.AsignacionModule],
        controllers: [asignacion_contenido_controller_1.AsignacionContenidoController],
        providers: [asignacion_contenido_service_1.AsignacionContenidoService]
    })
], AsignacionContenidoModule);
exports.AsignacionContenidoModule = AsignacionContenidoModule;
//# sourceMappingURL=asignacion-contenido.module.js.map