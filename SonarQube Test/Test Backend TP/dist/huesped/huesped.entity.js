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
exports.HuespedEntity = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const reserva_servicio_entity_1 = require("../reserva-servicio/reserva-servicio.entity");
const checkin_entity_1 = require("../checkin/checkin.entity");
const typeorm_1 = require("typeorm");
let HuespedEntity = class HuespedEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, apellido: { required: true, type: () => String }, tipodocumento: { required: true, type: () => String }, email: { required: true, type: () => String }, numero_telefono: { required: true, type: () => String }, ciudad: { required: true, type: () => String }, pais: { required: true, type: () => String }, reservaServicio: { required: true, type: () => [require("../reserva-servicio/reserva-servicio.entity").ReservaServicioEntity] }, checkin: { required: true, type: () => [require("../checkin/checkin.entity").CheckinEntity] } };
    }
};
__decorate([
    class_validator_1.IsOptional(),
    typeorm_1.PrimaryColumn({ name: `idhuesped` }),
    __metadata("design:type", String)
], HuespedEntity.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], HuespedEntity.prototype, "nombre", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], HuespedEntity.prototype, "apellido", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], HuespedEntity.prototype, "tipodocumento", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], HuespedEntity.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], HuespedEntity.prototype, "numero_telefono", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], HuespedEntity.prototype, "ciudad", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], HuespedEntity.prototype, "pais", void 0);
__decorate([
    typeorm_1.OneToMany(type => reserva_servicio_entity_1.ReservaServicioEntity, reserva => reserva.huesped, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], HuespedEntity.prototype, "reservaServicio", void 0);
__decorate([
    typeorm_1.OneToMany(type => checkin_entity_1.CheckinEntity, reserva => reserva.huesped, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], HuespedEntity.prototype, "checkin", void 0);
HuespedEntity = __decorate([
    typeorm_1.Entity({ name: 'huesped' })
], HuespedEntity);
exports.HuespedEntity = HuespedEntity;
//# sourceMappingURL=huesped.entity.js.map