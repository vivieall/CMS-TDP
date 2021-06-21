"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaModule = void 0;
const common_1 = require("@nestjs/common");
const venta_service_1 = require("./venta.service");
const venta_controller_1 = require("./venta.controller");
const typeorm_1 = require("@nestjs/typeorm");
const venta_entity_1 = require("./venta.entity");
const checkin_module_1 = require("../checkin/checkin.module");
let VentaModule = class VentaModule {
};
VentaModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([venta_entity_1.VentaEntity]), checkin_module_1.CheckinModule],
        providers: [venta_service_1.VentaService],
        controllers: [venta_controller_1.VentaController]
    })
], VentaModule);
exports.VentaModule = VentaModule;
//# sourceMappingURL=venta.module.js.map