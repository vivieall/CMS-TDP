"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenitieModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const amenitie_controller_1 = require("./amenitie.controller");
const amenitie_entity_1 = require("./amenitie.entity");
const amenitie_service_1 = require("./amenitie.service");
let AmenitieModule = class AmenitieModule {
};
AmenitieModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([amenitie_entity_1.AmenitieEntity]), common_1.HttpModule],
        controllers: [amenitie_controller_1.AmenitieController],
        providers: [amenitie_service_1.AmenitieService]
    })
], AmenitieModule);
exports.AmenitieModule = AmenitieModule;
//# sourceMappingURL=amenitie.module.js.map