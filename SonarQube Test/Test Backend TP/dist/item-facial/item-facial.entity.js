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
exports.ItemFacialEntity = void 0;
const openapi = require("@nestjs/swagger");
const motor_facial_entity_1 = require("../motor-facial/motor-facial.entity");
const typeorm_1 = require("typeorm");
let ItemFacialEntity = class ItemFacialEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, genero: { required: true, type: () => String }, grupo: { required: true, type: () => String }, tipo: { required: true, type: () => String }, motorfacial: { required: true, type: () => [require("../motor-facial/motor-facial.entity").MotorFacialEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `iditemfacial` }),
    __metadata("design:type", String)
], ItemFacialEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ItemFacialEntity.prototype, "genero", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ItemFacialEntity.prototype, "grupo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ItemFacialEntity.prototype, "tipo", void 0);
__decorate([
    typeorm_1.OneToMany(() => motor_facial_entity_1.MotorFacialEntity, motorfacial => motorfacial.itemfacial),
    __metadata("design:type", Array)
], ItemFacialEntity.prototype, "motorfacial", void 0);
ItemFacialEntity = __decorate([
    typeorm_1.Entity({ name: 'item_facial' })
], ItemFacialEntity);
exports.ItemFacialEntity = ItemFacialEntity;
//# sourceMappingURL=item-facial.entity.js.map