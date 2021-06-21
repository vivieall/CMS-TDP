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
exports.TipoAmenitieEntity = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const amenitie_entity_1 = require("../amenitie/amenitie.entity");
const typeorm_1 = require("typeorm");
let TipoAmenitieEntity = class TipoAmenitieEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, amenity: { required: true, type: () => [require("../amenitie/amenitie.entity").AmenitieEntity] } };
    }
};
__decorate([
    class_validator_1.IsOptional(),
    typeorm_1.PrimaryColumn({ name: `idtipoamenitie` }),
    __metadata("design:type", String)
], TipoAmenitieEntity.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], TipoAmenitieEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.OneToMany(type => amenitie_entity_1.AmenitieEntity, userChat => userChat.tipoAmenitie),
    __metadata("design:type", Array)
], TipoAmenitieEntity.prototype, "amenity", void 0);
TipoAmenitieEntity = __decorate([
    typeorm_1.Entity({ name: 'tipo_amenitie' })
], TipoAmenitieEntity);
exports.TipoAmenitieEntity = TipoAmenitieEntity;
//# sourceMappingURL=tipo-amenitie.entity.js.map