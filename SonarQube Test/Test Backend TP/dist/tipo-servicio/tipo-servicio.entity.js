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
exports.TipoServicioEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const servicio_entity_1 = require("../servicio/servicio.entity");
let TipoServicioEntity = class TipoServicioEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, servicios: { required: true, type: () => [require("../servicio/servicio.entity").ServicioEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idtiposervicio` }),
    __metadata("design:type", String)
], TipoServicioEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TipoServicioEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TipoServicioEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.OneToMany(() => servicio_entity_1.ServicioEntity, servicio => servicio.tiposervicio, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], TipoServicioEntity.prototype, "servicios", void 0);
TipoServicioEntity = __decorate([
    typeorm_1.Entity({ name: 'tipo_servicio' })
], TipoServicioEntity);
exports.TipoServicioEntity = TipoServicioEntity;
//# sourceMappingURL=tipo-servicio.entity.js.map