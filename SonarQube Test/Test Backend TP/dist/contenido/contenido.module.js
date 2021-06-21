"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContenidoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contenido_controller_1 = require("./contenido.controller");
const contenido_entity_1 = require("./contenido.entity");
const contenido_service_1 = require("./contenido.service");
let ContenidoModule = class ContenidoModule {
};
ContenidoModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([contenido_entity_1.ContenidoEntity]), common_1.HttpModule],
        controllers: [contenido_controller_1.ContenidoController],
        providers: [contenido_service_1.ContenidoService]
    })
], ContenidoModule);
exports.ContenidoModule = ContenidoModule;
//# sourceMappingURL=contenido.module.js.map