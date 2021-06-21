"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAnuncioEntity = void 0;
const openapi = require("@nestjs/swagger");
const anuncio_entity_1 = require("../anuncio/anuncio.entity");
const typeorm_1 = require("typeorm");
let TipoAnuncioEntity = class TipoAnuncioEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, anuncio: { required: true, type: () => [require("../anuncio/anuncio.entity").AnuncioEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idtipoanuncio` }),
    __metadata("design:type", String)
], TipoAnuncioEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TipoAnuncioEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TipoAnuncioEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.OneToMany(() => anuncio_entity_1.AnuncioEntity, anuncio => anuncio.tipoanuncio),
    __metadata("design:type", Array)
], TipoAnuncioEntity.prototype, "anuncio", void 0);
TipoAnuncioEntity = __decorate([
    typeorm_1.Entity({ name: 'tipo_anuncio' })
], TipoAnuncioEntity);
exports.TipoAnuncioEntity = TipoAnuncioEntity;
//# sourceMappingURL=tipo-anuncio.entity.js.map