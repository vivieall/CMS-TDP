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
exports.HabitacionEntity = void 0;
const openapi = require("@nestjs/swagger");
const checkin_entity_1 = require("../checkin/checkin.entity");
const reserva_servicio_entity_1 = require("../reserva-servicio/reserva-servicio.entity");
const typeorm_1 = require("typeorm");
let HabitacionEntity = class HabitacionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, checkin: { required: true, type: () => require("../checkin/checkin.entity").CheckinEntity }, reservaServicio: { required: true, type: () => [require("../reserva-servicio/reserva-servicio.entity").ReservaServicioEntity] }, numerohabitacion: { required: true, type: () => Number }, descripcion: { required: true, type: () => String }, activo: { required: true, type: () => Boolean } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idhabtiacion` }),
    __metadata("design:type", String)
], HabitacionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => checkin_entity_1.CheckinEntity, checkin => checkin.habitacion, { onDelete: 'CASCADE' }),
    __metadata("design:type", checkin_entity_1.CheckinEntity)
], HabitacionEntity.prototype, "checkin", void 0);
__decorate([
    typeorm_1.OneToMany(() => reserva_servicio_entity_1.ReservaServicioEntity, reservaServicio => reservaServicio.habitacion, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], HabitacionEntity.prototype, "reservaServicio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], HabitacionEntity.prototype, "numerohabitacion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], HabitacionEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], HabitacionEntity.prototype, "activo", void 0);
HabitacionEntity = __decorate([
    typeorm_1.Entity({ name: 'habitacion' })
], HabitacionEntity);
exports.HabitacionEntity = HabitacionEntity;
//# sourceMappingURL=habitacion.entity.js.map