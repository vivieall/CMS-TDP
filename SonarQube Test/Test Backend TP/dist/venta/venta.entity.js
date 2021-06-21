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
exports.VentaEntity = void 0;
const openapi = require("@nestjs/swagger");
const checkin_entity_1 = require("../checkin/checkin.entity");
const detalle_transaccion_entity_1 = require("../detalle-transaccion/detalle-transaccion.entity");
const typeorm_1 = require("typeorm");
const transaccion_entity_1 = require("../transaccion/transaccion.entity");
let VentaEntity = class VentaEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, checkin: { required: true, type: () => require("../checkin/checkin.entity").CheckinEntity }, transaccion: { required: true, type: () => require("../transaccion/transaccion.entity").TransaccionEntity }, detalleTransaccion: { required: true, type: () => [require("../detalle-transaccion/detalle-transaccion.entity").DetalleTransaccionEntity] }, monto: { required: true, type: () => Number }, moneda: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, fecha: { required: true, type: () => Number } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idventa` }),
    __metadata("design:type", String)
], VentaEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => checkin_entity_1.CheckinEntity, checkin => checkin.venta, { onDelete: 'CASCADE' }),
    __metadata("design:type", checkin_entity_1.CheckinEntity)
], VentaEntity.prototype, "checkin", void 0);
__decorate([
    typeorm_1.ManyToOne(() => transaccion_entity_1.TransaccionEntity, transaccion => transaccion.venta, { onDelete: 'CASCADE' }),
    __metadata("design:type", transaccion_entity_1.TransaccionEntity)
], VentaEntity.prototype, "transaccion", void 0);
__decorate([
    typeorm_1.OneToMany(() => detalle_transaccion_entity_1.DetalleTransaccionEntity, detalleTransaccion => detalleTransaccion.venta, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], VentaEntity.prototype, "detalleTransaccion", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], VentaEntity.prototype, "monto", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VentaEntity.prototype, "moneda", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VentaEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp' }),
    __metadata("design:type", Number)
], VentaEntity.prototype, "fecha", void 0);
VentaEntity = __decorate([
    typeorm_1.Entity({ name: 'venta' })
], VentaEntity);
exports.VentaEntity = VentaEntity;
//# sourceMappingURL=venta.entity.js.map