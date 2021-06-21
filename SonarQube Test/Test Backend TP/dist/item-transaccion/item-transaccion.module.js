"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemTransaccionModule = void 0;
const common_1 = require("@nestjs/common");
const item_transaccion_service_1 = require("./item-transaccion.service");
const item_transaccion_controller_1 = require("./item-transaccion.controller");
const typeorm_1 = require("@nestjs/typeorm");
const item_transaccion_entity_1 = require("./item-transaccion.entity");
let ItemTransaccionModule = class ItemTransaccionModule {
};
ItemTransaccionModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([item_transaccion_entity_1.ItemTransaccionEntity])],
        providers: [item_transaccion_service_1.ItemTransaccionService],
        controllers: [item_transaccion_controller_1.ItemTransaccionController]
    })
], ItemTransaccionModule);
exports.ItemTransaccionModule = ItemTransaccionModule;
//# sourceMappingURL=item-transaccion.module.js.map