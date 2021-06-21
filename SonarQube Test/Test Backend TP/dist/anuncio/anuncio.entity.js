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
exports.AnuncioEntity = void 0;
const openapi = require("@nestjs/swagger");
const tipo_anuncio_entity_1 = require("../tipo-anuncio/tipo-anuncio.entity");
const typeorm_1 = require("typeorm");
let AnuncioEntity = class AnuncioEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, tipoanuncio: { required: true, type: () => require("../tipo-anuncio/tipo-anuncio.entity").TipoAnuncioEntity } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idanuncio` }),
    __metadata("design:type", String)
], AnuncioEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AnuncioEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AnuncioEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.ManyToOne(() => tipo_anuncio_entity_1.TipoAnuncioEntity, tipoanuncio => tipoanuncio.anuncio, { onDelete: 'CASCADE' }),
    __metadata("design:type", tipo_anuncio_entity_1.TipoAnuncioEntity)
], AnuncioEntity.prototype, "tipoanuncio", void 0);
AnuncioEntity = __decorate([
    typeorm_1.Entity({ name: 'anuncio' })
], AnuncioEntity);
exports.AnuncioEntity = AnuncioEntity;
//# sourceMappingURL=anuncio.entity.js.map