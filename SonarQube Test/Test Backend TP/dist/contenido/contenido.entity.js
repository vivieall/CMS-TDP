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
exports.ContenidoEntity = void 0;
const openapi = require("@nestjs/swagger");
const asignacion_contenido_entity_1 = require("../asignacion-contenido/asignacion-contenido.entity");
const item_transaccion_entity_1 = require("../item-transaccion/item-transaccion.entity");
const typeorm_1 = require("typeorm");
let ContenidoEntity = class ContenidoEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, url_imagen: { required: true, type: () => String }, s3Key: { required: true, type: () => String }, asignacioncontenido: { required: true, type: () => [require("../asignacion-contenido/asignacion-contenido.entity").AsignacionContenidoEntity] }, itemTransaccion: { required: true, type: () => require("../item-transaccion/item-transaccion.entity").ItemTransaccionEntity } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: 'idcontenido' }),
    __metadata("design:type", String)
], ContenidoEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ContenidoEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ContenidoEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ContenidoEntity.prototype, "url_imagen", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ContenidoEntity.prototype, "s3Key", void 0);
__decorate([
    typeorm_1.OneToMany(() => asignacion_contenido_entity_1.AsignacionContenidoEntity, asignacioncontenido => asignacioncontenido.contenido),
    __metadata("design:type", Array)
], ContenidoEntity.prototype, "asignacioncontenido", void 0);
__decorate([
    typeorm_1.OneToOne(() => item_transaccion_entity_1.ItemTransaccionEntity, itemTransaccion => itemTransaccion.contenido),
    typeorm_1.JoinColumn(),
    __metadata("design:type", item_transaccion_entity_1.ItemTransaccionEntity)
], ContenidoEntity.prototype, "itemTransaccion", void 0);
ContenidoEntity = __decorate([
    typeorm_1.Entity({ name: 'contenido' })
], ContenidoEntity);
exports.ContenidoEntity = ContenidoEntity;
//# sourceMappingURL=contenido.entity.js.map