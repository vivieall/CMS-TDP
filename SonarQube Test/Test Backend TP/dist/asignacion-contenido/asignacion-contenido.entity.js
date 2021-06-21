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
exports.AsignacionContenidoEntity = void 0;
const openapi = require("@nestjs/swagger");
const asignacion_entity_1 = require("../asignacion/asignacion.entity");
const contenido_entity_1 = require("../contenido/contenido.entity");
const dispositivo_entity_1 = require("../dispositivo/dispositivo.entity");
const grupo_contenido_entity_1 = require("../grupo-contenido/grupo-contenido.entity");
const typeorm_1 = require("typeorm");
let AsignacionContenidoEntity = class AsignacionContenidoEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, contenido: { required: true, type: () => require("../contenido/contenido.entity").ContenidoEntity }, grupocontenido: { required: true, type: () => require("../grupo-contenido/grupo-contenido.entity").GrupoContenidoEntity }, asignacion: { required: true, type: () => require("../asignacion/asignacion.entity").AsignacionEntity }, dispositivo: { required: true, type: () => [require("../dispositivo/dispositivo.entity").DispositivoEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idasignacioncontenido` }),
    __metadata("design:type", String)
], AsignacionContenidoEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => contenido_entity_1.ContenidoEntity, contenido => contenido.asignacioncontenido, { onDelete: 'CASCADE' }),
    __metadata("design:type", contenido_entity_1.ContenidoEntity)
], AsignacionContenidoEntity.prototype, "contenido", void 0);
__decorate([
    typeorm_1.ManyToOne(() => grupo_contenido_entity_1.GrupoContenidoEntity, grupocontenido => grupocontenido.asignacioncontenido, { onDelete: 'CASCADE' }),
    __metadata("design:type", grupo_contenido_entity_1.GrupoContenidoEntity)
], AsignacionContenidoEntity.prototype, "grupocontenido", void 0);
__decorate([
    typeorm_1.ManyToOne(() => asignacion_entity_1.AsignacionEntity, asignacion => asignacion.asignacioncontenido, { onDelete: 'CASCADE' }),
    __metadata("design:type", asignacion_entity_1.AsignacionEntity)
], AsignacionContenidoEntity.prototype, "asignacion", void 0);
__decorate([
    typeorm_1.OneToMany(() => dispositivo_entity_1.DispositivoEntity, dispositivo => dispositivo.asignacioncontenido),
    __metadata("design:type", Array)
], AsignacionContenidoEntity.prototype, "dispositivo", void 0);
AsignacionContenidoEntity = __decorate([
    typeorm_1.Entity({ name: 'asignacion_contenido' })
], AsignacionContenidoEntity);
exports.AsignacionContenidoEntity = AsignacionContenidoEntity;
//# sourceMappingURL=asignacion-contenido.entity.js.map