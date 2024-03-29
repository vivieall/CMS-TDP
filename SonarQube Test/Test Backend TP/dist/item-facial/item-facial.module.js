"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemFacialModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const item_facial_controller_1 = require("./item-facial.controller");
const item_facial_entity_1 = require("./item-facial.entity");
const item_facial_service_1 = require("./item-facial.service");
let ItemFacialModule = class ItemFacialModule {
};
ItemFacialModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([item_facial_entity_1.ItemFacialEntity])],
        providers: [item_facial_service_1.ItemFacialService],
        controllers: [item_facial_controller_1.ItemFacialController]
    })
], ItemFacialModule);
exports.ItemFacialModule = ItemFacialModule;
//# sourceMappingURL=item-facial.module.js.map