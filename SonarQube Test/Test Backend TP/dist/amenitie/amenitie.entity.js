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
exports.AmenitieEntity = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const tipo_amenitie_entity_1 = require("../tipo-amenitie/tipo-amenitie.entity");
let AmenitieEntity = class AmenitieEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, clima: { required: true, type: () => String }, climaData: { required: true, type: () => Object }, tipoAmenitie: { required: true, type: () => require("../tipo-amenitie/tipo-amenitie.entity").TipoAmenitieEntity } };
    }
};
__decorate([
    class_validator_1.IsOptional(),
    typeorm_1.PrimaryColumn({ name: `idamenitie` }),
    __metadata("design:type", String)
], AmenitieEntity.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], AmenitieEntity.prototype, "nombre", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], AmenitieEntity.prototype, "descripcion", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], AmenitieEntity.prototype, "clima", void 0);
__decorate([
    typeorm_1.ManyToOne(type => tipo_amenitie_entity_1.TipoAmenitieEntity, tipoAmenitie => tipoAmenitie.amenity, { onDelete: 'CASCADE' }),
    __metadata("design:type", tipo_amenitie_entity_1.TipoAmenitieEntity)
], AmenitieEntity.prototype, "tipoAmenitie", void 0);
AmenitieEntity = __decorate([
    typeorm_1.Entity({ name: 'amenitie' })
], AmenitieEntity);
exports.AmenitieEntity = AmenitieEntity;
//# sourceMappingURL=amenitie.entity.js.map