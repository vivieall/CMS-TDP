"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministradorModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const administrador_controller_1 = require("./administrador.controller");
const administrador_entity_1 = require("./administrador.entity");
const administrador_service_1 = require("./administrador.service");
let AdministradorModule = class AdministradorModule {
};
AdministradorModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([administrador_entity_1.AdministradorEntity])],
        controllers: [administrador_controller_1.AdministradorController],
        providers: [administrador_service_1.AdministradorService]
    })
], AdministradorModule);
exports.AdministradorModule = AdministradorModule;
//# sourceMappingURL=administrador.module.js.map