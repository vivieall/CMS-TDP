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
exports.TipoTransaccionEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const transaccion_entity_1 = require("../transaccion/transaccion.entity");
let TipoTransaccionEntity = class TipoTransaccionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, transaccion: { required: true, type: () => [require("../transaccion/transaccion.entity").TransaccionEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idtipotransaccion` }),
    __metadata("design:type", String)
], TipoTransaccionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TipoTransaccionEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TipoTransaccionEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.OneToMany(() => transaccion_entity_1.TransaccionEntity, transaccion => transaccion.tipotransaccion, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], TipoTransaccionEntity.prototype, "transaccion", void 0);
TipoTransaccionEntity = __decorate([
    typeorm_1.Entity({ name: 'tipo_transaccion' })
], TipoTransaccionEntity);
exports.TipoTransaccionEntity = TipoTransaccionEntity;
//# sourceMappingURL=tipo-transaccion.entity.js.map