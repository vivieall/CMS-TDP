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
exports.AsignacionEntity = void 0;
const openapi = require("@nestjs/swagger");
const asignacion_contenido_entity_1 = require("../asignacion-contenido/asignacion-contenido.entity");
const typeorm_1 = require("typeorm");
let AsignacionEntity = class AsignacionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, iniciotiempo: { required: true, type: () => Number }, fintiempo: { required: true, type: () => Number }, nombredispositivo: { required: true, type: () => String }, asignacioncontenido: { required: true, type: () => [require("../asignacion-contenido/asignacion-contenido.entity").AsignacionContenidoEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idasignacion` }),
    __metadata("design:type", String)
], AsignacionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "time", nullable: true }),
    __metadata("design:type", Number)
], AsignacionEntity.prototype, "iniciotiempo", void 0);
__decorate([
    typeorm_1.Column({ type: "time", nullable: true }),
    __metadata("design:type", Number)
], AsignacionEntity.prototype, "fintiempo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AsignacionEntity.prototype, "nombredispositivo", void 0);
__decorate([
    typeorm_1.OneToMany(() => asignacion_contenido_entity_1.AsignacionContenidoEntity, asignacioncontenido => asignacioncontenido.asignacion),
    __metadata("design:type", Array)
], AsignacionEntity.prototype, "asignacioncontenido", void 0);
AsignacionEntity = __decorate([
    typeorm_1.Entity({ name: 'asignacion' })
], AsignacionEntity);
exports.AsignacionEntity = AsignacionEntity;
//# sourceMappingURL=asignacion.entity.js.map