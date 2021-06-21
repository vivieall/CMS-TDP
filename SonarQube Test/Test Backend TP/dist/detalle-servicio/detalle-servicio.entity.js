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
exports.DetalleServicioEntity = void 0;
const openapi = require("@nestjs/swagger");
const servicio_entity_1 = require("../servicio/servicio.entity");
const typeorm_1 = require("typeorm");
let DetalleServicioEntity = class DetalleServicioEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, servicio: { required: true, type: () => require("../servicio/servicio.entity").ServicioEntity } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `iddetalleservicio` }),
    __metadata("design:type", String)
], DetalleServicioEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], DetalleServicioEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], DetalleServicioEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.ManyToOne(() => servicio_entity_1.ServicioEntity, servicio => servicio.detalleservicio, { onDelete: 'CASCADE' }),
    __metadata("design:type", servicio_entity_1.ServicioEntity)
], DetalleServicioEntity.prototype, "servicio", void 0);
DetalleServicioEntity = __decorate([
    typeorm_1.Entity({ name: 'detalle_servicio' })
], DetalleServicioEntity);
exports.DetalleServicioEntity = DetalleServicioEntity;
//# sourceMappingURL=detalle-servicio.entity.js.map