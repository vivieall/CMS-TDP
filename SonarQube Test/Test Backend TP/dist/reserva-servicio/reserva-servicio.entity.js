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
exports.ReservaServicioEntity = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const habitacion_entity_1 = require("../habitacion/habitacion.entity");
const huesped_entity_1 = require("../huesped/huesped.entity");
const servicio_entity_1 = require("../servicio/servicio.entity");
const typeorm_1 = require("typeorm");
let ReservaServicioEntity = class ReservaServicioEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, tiempo_inicio: { required: true, type: () => Number }, tiempo_fin: { required: true, type: () => Number }, descripcion: { required: true, type: () => String }, cantidadpersona: { required: true, type: () => Number }, huesped: { required: true, type: () => require("../huesped/huesped.entity").HuespedEntity }, servicio: { required: true, type: () => require("../servicio/servicio.entity").ServicioEntity }, habitacion: { required: true, type: () => require("../habitacion/habitacion.entity").HabitacionEntity } };
    }
};
__decorate([
    class_validator_1.IsOptional(),
    typeorm_1.PrimaryColumn({ name: `idreservaservicio` }),
    __metadata("design:type", String)
], ReservaServicioEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp" }),
    __metadata("design:type", Number)
], ReservaServicioEntity.prototype, "tiempo_inicio", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp" }),
    __metadata("design:type", Number)
], ReservaServicioEntity.prototype, "tiempo_fin", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ReservaServicioEntity.prototype, "descripcion", void 0);
__decorate([
    class_validator_1.IsNumber(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ReservaServicioEntity.prototype, "cantidadpersona", void 0);
__decorate([
    typeorm_1.ManyToOne(type => huesped_entity_1.HuespedEntity, reserva => reserva.reservaServicio, { onDelete: 'CASCADE', eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", huesped_entity_1.HuespedEntity)
], ReservaServicioEntity.prototype, "huesped", void 0);
__decorate([
    typeorm_1.ManyToOne(type => servicio_entity_1.ServicioEntity, reserva => reserva.reservaServicio, { onDelete: 'CASCADE' }),
    __metadata("design:type", servicio_entity_1.ServicioEntity)
], ReservaServicioEntity.prototype, "servicio", void 0);
__decorate([
    typeorm_1.ManyToOne(type => habitacion_entity_1.HabitacionEntity, reserva => reserva.reservaServicio, { onDelete: 'CASCADE' }),
    __metadata("design:type", habitacion_entity_1.HabitacionEntity)
], ReservaServicioEntity.prototype, "habitacion", void 0);
ReservaServicioEntity = __decorate([
    typeorm_1.Entity({ name: 'reserva_servicio' })
], ReservaServicioEntity);
exports.ReservaServicioEntity = ReservaServicioEntity;
//# sourceMappingURL=reserva-servicio.entity.js.map