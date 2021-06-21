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
exports.DetalleTransaccionEntity = void 0;
const openapi = require("@nestjs/swagger");
const item_transaccion_entity_1 = require("../item-transaccion/item-transaccion.entity");
const venta_entity_1 = require("../venta/venta.entity");
const typeorm_1 = require("typeorm");
let DetalleTransaccionEntity = class DetalleTransaccionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, venta: { required: true, type: () => require("../venta/venta.entity").VentaEntity }, itemTransaccion: { required: true, type: () => require("../item-transaccion/item-transaccion.entity").ItemTransaccionEntity }, precio: { required: true, type: () => String }, cantidad: { required: true, type: () => Number } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `iddetalletransaccion` }),
    __metadata("design:type", String)
], DetalleTransaccionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => venta_entity_1.VentaEntity, venta => venta.detalleTransaccion, { onDelete: 'CASCADE' }),
    __metadata("design:type", venta_entity_1.VentaEntity)
], DetalleTransaccionEntity.prototype, "venta", void 0);
__decorate([
    typeorm_1.ManyToOne(() => item_transaccion_entity_1.ItemTransaccionEntity, itemTransaccion => itemTransaccion.detalleTransaccion, { onDelete: 'CASCADE' }),
    __metadata("design:type", item_transaccion_entity_1.ItemTransaccionEntity)
], DetalleTransaccionEntity.prototype, "itemTransaccion", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", String)
], DetalleTransaccionEntity.prototype, "precio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], DetalleTransaccionEntity.prototype, "cantidad", void 0);
DetalleTransaccionEntity = __decorate([
    typeorm_1.Entity({ name: 'detalle_transaccion' })
], DetalleTransaccionEntity);
exports.DetalleTransaccionEntity = DetalleTransaccionEntity;
//# sourceMappingURL=detalle-transaccion.entity.js.map