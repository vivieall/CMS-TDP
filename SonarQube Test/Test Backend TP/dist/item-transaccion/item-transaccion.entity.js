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
exports.ItemTransaccionEntity = void 0;
const openapi = require("@nestjs/swagger");
const contenido_entity_1 = require("../contenido/contenido.entity");
const detalle_transaccion_entity_1 = require("../detalle-transaccion/detalle-transaccion.entity");
const transaccion_entity_1 = require("../transaccion/transaccion.entity");
const typeorm_1 = require("typeorm");
let ItemTransaccionEntity = class ItemTransaccionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, contenido: { required: true, type: () => require("../contenido/contenido.entity").ContenidoEntity }, detalleTransaccion: { required: true, type: () => [require("../detalle-transaccion/detalle-transaccion.entity").DetalleTransaccionEntity] }, precio: { required: true, type: () => Number }, cantidad: { required: true, type: () => Number }, activo: { required: true, type: () => Boolean }, transaccion: { required: true, type: () => require("../transaccion/transaccion.entity").TransaccionEntity } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `iditemtransaccion` }),
    __metadata("design:type", String)
], ItemTransaccionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(() => contenido_entity_1.ContenidoEntity, contenido => contenido.itemTransaccion, { onDelete: 'CASCADE', eager: true }),
    __metadata("design:type", contenido_entity_1.ContenidoEntity)
], ItemTransaccionEntity.prototype, "contenido", void 0);
__decorate([
    typeorm_1.OneToMany(() => detalle_transaccion_entity_1.DetalleTransaccionEntity, detalleTransaccion => detalleTransaccion.itemTransaccion, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], ItemTransaccionEntity.prototype, "detalleTransaccion", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], ItemTransaccionEntity.prototype, "precio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ItemTransaccionEntity.prototype, "cantidad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ItemTransaccionEntity.prototype, "activo", void 0);
__decorate([
    typeorm_1.ManyToOne(() => transaccion_entity_1.TransaccionEntity, transaccion => transaccion.itemTransaccion, { onDelete: 'CASCADE' }),
    __metadata("design:type", transaccion_entity_1.TransaccionEntity)
], ItemTransaccionEntity.prototype, "transaccion", void 0);
ItemTransaccionEntity = __decorate([
    typeorm_1.Entity({ name: 'item_transaccion' })
], ItemTransaccionEntity);
exports.ItemTransaccionEntity = ItemTransaccionEntity;
//# sourceMappingURL=item-transaccion.entity.js.map