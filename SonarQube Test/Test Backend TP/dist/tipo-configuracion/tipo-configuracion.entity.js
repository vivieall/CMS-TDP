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
exports.TipoConfiguracionEntity = void 0;
const openapi = require("@nestjs/swagger");
const configuracion_entity_1 = require("../configuracion/configuracion.entity");
const typeorm_1 = require("typeorm");
let TipoConfiguracionEntity = class TipoConfiguracionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, configuracion: { required: true, type: () => [require("../configuracion/configuracion.entity").ConfiguracionEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idtipoconfiguracion` }),
    __metadata("design:type", String)
], TipoConfiguracionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TipoConfiguracionEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.OneToMany(() => configuracion_entity_1.ConfiguracionEntity, configuracion => configuracion.tipoconfiguracion),
    __metadata("design:type", Array)
], TipoConfiguracionEntity.prototype, "configuracion", void 0);
TipoConfiguracionEntity = __decorate([
    typeorm_1.Entity({ name: 'tipo_configuracion' })
], TipoConfiguracionEntity);
exports.TipoConfiguracionEntity = TipoConfiguracionEntity;
//# sourceMappingURL=tipo-configuracion.entity.js.map