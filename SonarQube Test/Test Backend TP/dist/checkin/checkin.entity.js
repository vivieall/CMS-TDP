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
exports.CheckinEntity = void 0;
const openapi = require("@nestjs/swagger");
const habitacion_entity_1 = require("../habitacion/habitacion.entity");
const huesped_entity_1 = require("../huesped/huesped.entity");
const venta_entity_1 = require("../venta/venta.entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let CheckinEntity = class CheckinEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, huesped: { required: true, type: () => require("../huesped/huesped.entity").HuespedEntity }, venta: { required: true, type: () => [require("../venta/venta.entity").VentaEntity] }, habitacion: { required: true, type: () => require("../habitacion/habitacion.entity").HabitacionEntity }, antiguaHabitacion: { required: true, type: () => String }, tiempo_inicio: { required: true, type: () => Number }, tiempo_fin: { required: true, type: () => Number } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idcheckin` }),
    __metadata("design:type", String)
], CheckinEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => huesped_entity_1.HuespedEntity, huesped => huesped.checkin, { onDelete: 'CASCADE' }),
    __metadata("design:type", huesped_entity_1.HuespedEntity)
], CheckinEntity.prototype, "huesped", void 0);
__decorate([
    typeorm_1.OneToMany(() => venta_entity_1.VentaEntity, venta => venta.checkin, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], CheckinEntity.prototype, "venta", void 0);
__decorate([
    typeorm_1.ManyToOne(() => habitacion_entity_1.HabitacionEntity, habitacion => habitacion.checkin, { onDelete: 'CASCADE' }),
    __metadata("design:type", habitacion_entity_1.HabitacionEntity)
], CheckinEntity.prototype, "habitacion", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CheckinEntity.prototype, "antiguaHabitacion", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp" }),
    __metadata("design:type", Number)
], CheckinEntity.prototype, "tiempo_inicio", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp" }),
    __metadata("design:type", Number)
], CheckinEntity.prototype, "tiempo_fin", void 0);
CheckinEntity = __decorate([
    typeorm_1.Entity({ name: 'checkin' })
], CheckinEntity);
exports.CheckinEntity = CheckinEntity;
//# sourceMappingURL=checkin.entity.js.map