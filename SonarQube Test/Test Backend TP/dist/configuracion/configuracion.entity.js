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
exports.ConfiguracionEntity = void 0;
const openapi = require("@nestjs/swagger");
const tipo_configuracion_entity_1 = require("../tipo-configuracion/tipo-configuracion.entity");
const typeorm_1 = require("typeorm");
let ConfiguracionEntity = class ConfiguracionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, tipoconfiguracion: { required: true, type: () => require("../tipo-configuracion/tipo-configuracion.entity").TipoConfiguracionEntity } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idconfiguracion` }),
    __metadata("design:type", String)
], ConfiguracionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ConfiguracionEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ConfiguracionEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.ManyToOne(() => tipo_configuracion_entity_1.TipoConfiguracionEntity, tipoconfiguracion => tipoconfiguracion.configuracion),
    __metadata("design:type", tipo_configuracion_entity_1.TipoConfiguracionEntity)
], ConfiguracionEntity.prototype, "tipoconfiguracion", void 0);
ConfiguracionEntity = __decorate([
    typeorm_1.Entity({ name: 'configuracion' })
], ConfiguracionEntity);
exports.ConfiguracionEntity = ConfiguracionEntity;
//# sourceMappingURL=configuracion.entity.js.map