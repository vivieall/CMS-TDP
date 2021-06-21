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
exports.ServicioEntity = void 0;
const openapi = require("@nestjs/swagger");
const detalle_servicio_entity_1 = require("../detalle-servicio/detalle-servicio.entity");
const reserva_servicio_entity_1 = require("../reserva-servicio/reserva-servicio.entity");
const typeorm_1 = require("typeorm");
const tipo_servicio_entity_1 = require("../tipo-servicio/tipo-servicio.entity");
let ServicioEntity = class ServicioEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, tiposervicio: { required: true, type: () => require("../tipo-servicio/tipo-servicio.entity").TipoServicioEntity }, detalleservicio: { required: true, type: () => [require("../detalle-servicio/detalle-servicio.entity").DetalleServicioEntity] }, reservaServicio: { required: true, type: () => [require("../reserva-servicio/reserva-servicio.entity").ReservaServicioEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idservicio` }),
    __metadata("design:type", String)
], ServicioEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ServicioEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ServicioEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.ManyToOne(() => tipo_servicio_entity_1.TipoServicioEntity, tiposervicio => tiposervicio.servicios, { onDelete: 'CASCADE' }),
    __metadata("design:type", tipo_servicio_entity_1.TipoServicioEntity)
], ServicioEntity.prototype, "tiposervicio", void 0);
__decorate([
    typeorm_1.OneToMany(() => detalle_servicio_entity_1.DetalleServicioEntity, detalleservicio => detalleservicio.servicio),
    __metadata("design:type", Array)
], ServicioEntity.prototype, "detalleservicio", void 0);
__decorate([
    typeorm_1.OneToMany(() => reserva_servicio_entity_1.ReservaServicioEntity, detalleservicio => detalleservicio.servicio),
    __metadata("design:type", Array)
], ServicioEntity.prototype, "reservaServicio", void 0);
ServicioEntity = __decorate([
    typeorm_1.Entity({ name: 'servicio' })
], ServicioEntity);
exports.ServicioEntity = ServicioEntity;
//# sourceMappingURL=servicio.entity.js.map