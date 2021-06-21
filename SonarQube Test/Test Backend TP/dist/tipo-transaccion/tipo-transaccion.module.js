"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoTransaccionModule = void 0;
const common_1 = require("@nestjs/common");
const tipo_transaccion_service_1 = require("./tipo-transaccion.service");
const tipo_transaccion_controller_1 = require("./tipo-transaccion.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_transaccion_entity_1 = require("./tipo-transaccion.entity");
let TipoTransaccionModule = class TipoTransaccionModule {
};
TipoTransaccionModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([tipo_transaccion_entity_1.TipoTransaccionEntity])],
        providers: [tipo_transaccion_service_1.TipoTransaccionService],
        controllers: [tipo_transaccion_controller_1.TipoTransaccionController]
    })
], TipoTransaccionModule);
exports.TipoTransaccionModule = TipoTransaccionModule;
//# sourceMappingURL=tipo-transaccion.module.js.map