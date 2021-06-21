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
exports.GrupoContenidoEntity = void 0;
const openapi = require("@nestjs/swagger");
const asignacion_contenido_entity_1 = require("../asignacion-contenido/asignacion-contenido.entity");
const typeorm_1 = require("typeorm");
let GrupoContenidoEntity = class GrupoContenidoEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, asignacioncontenido: { required: true, type: () => [require("../asignacion-contenido/asignacion-contenido.entity").AsignacionContenidoEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: `idgrupo` }),
    __metadata("design:type", String)
], GrupoContenidoEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GrupoContenidoEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GrupoContenidoEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.OneToMany(() => asignacion_contenido_entity_1.AsignacionContenidoEntity, asignacioncontenido => asignacioncontenido.grupocontenido),
    __metadata("design:type", Array)
], GrupoContenidoEntity.prototype, "asignacioncontenido", void 0);
GrupoContenidoEntity = __decorate([
    typeorm_1.Entity({ name: 'grupo_contenido' })
], GrupoContenidoEntity);
exports.GrupoContenidoEntity = GrupoContenidoEntity;
//# sourceMappingURL=grupo-contenido.entity.js.map