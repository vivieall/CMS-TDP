"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrupoContenidoModule = void 0;
const common_1 = require("@nestjs/common");
const grupo_contenido_service_1 = require("./grupo-contenido.service");
const grupo_contenido_controller_1 = require("./grupo-contenido.controller");
const typeorm_1 = require("@nestjs/typeorm");
const grupo_contenido_entity_1 = require("./grupo-contenido.entity");
let GrupoContenidoModule = class GrupoContenidoModule {
};
GrupoContenidoModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([grupo_contenido_entity_1.GrupoContenidoEntity])],
        providers: [grupo_contenido_service_1.GrupoContenidoService],
        controllers: [grupo_contenido_controller_1.GrupoContenidoController]
    })
], GrupoContenidoModule);
exports.GrupoContenidoModule = GrupoContenidoModule;
//# sourceMappingURL=grupo-contenido.module.js.map