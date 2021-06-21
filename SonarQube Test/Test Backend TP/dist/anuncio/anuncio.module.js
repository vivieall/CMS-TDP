"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnuncioModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const anuncio_controller_1 = require("./anuncio.controller");
const anuncio_entity_1 = require("./anuncio.entity");
const anuncio_service_1 = require("./anuncio.service");
let AnuncioModule = class AnuncioModule {
};
AnuncioModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([anuncio_entity_1.AnuncioEntity])],
        providers: [anuncio_service_1.AnuncioService],
        controllers: [anuncio_controller_1.AnuncioController]
    })
], AnuncioModule);
exports.AnuncioModule = AnuncioModule;
//# sourceMappingURL=anuncio.module.js.map