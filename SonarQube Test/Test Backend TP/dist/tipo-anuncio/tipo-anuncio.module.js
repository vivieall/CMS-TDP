"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAnuncioModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_anuncio_controller_1 = require("./tipo-anuncio.controller");
const tipo_anuncio_entity_1 = require("./tipo-anuncio.entity");
const tipo_anuncio_service_1 = require("./tipo-anuncio.service");
let TipoAnuncioModule = class TipoAnuncioModule {
};
TipoAnuncioModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([tipo_anuncio_entity_1.TipoAnuncioEntity])],
        providers: [tipo_anuncio_service_1.TipoAnuncioService],
        controllers: [tipo_anuncio_controller_1.TipoAnuncioController]
    })
], TipoAnuncioModule);
exports.TipoAnuncioModule = TipoAnuncioModule;
//# sourceMappingURL=tipo-anuncio.module.js.map