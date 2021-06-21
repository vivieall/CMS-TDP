"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAmenitieModule = void 0;
const common_1 = require("@nestjs/common");
const tipo_amenitie_service_1 = require("./tipo-amenitie.service");
const tipo_amenitie_controller_1 = require("./tipo-amenitie.controller");
const tipo_amenitie_entity_1 = require("./tipo-amenitie.entity");
const typeorm_1 = require("@nestjs/typeorm");
let TipoAmenitieModule = class TipoAmenitieModule {
};
TipoAmenitieModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([tipo_amenitie_entity_1.TipoAmenitieEntity])],
        providers: [tipo_amenitie_service_1.TipoAmenitieService],
        controllers: [tipo_amenitie_controller_1.TipoAmenitieController]
    })
], TipoAmenitieModule);
exports.TipoAmenitieModule = TipoAmenitieModule;
//# sourceMappingURL=tipo-amenitie.module.js.map