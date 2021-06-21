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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionContenidoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const asignacion_contenido_entity_1 = require("./asignacion-contenido.entity");
const asignacion_contenido_service_1 = require("./asignacion-contenido.service");
let AsignacionContenidoController = class AsignacionContenidoController {
    constructor(asignacionContenidoService) {
        this.asignacionContenidoService = asignacionContenidoService;
    }
    async findAll() {
        return await this.asignacionContenidoService.findAllTipo();
    }
    async findbyidgrupo(id) {
        return await this.asignacionContenidoService.findByIdGrupo(id);
    }
    async findOne(id) {
        return await this.asignacionContenidoService.findOne(id);
    }
    async add(body) {
        return await this.asignacionContenidoService.add(body);
    }
    async update(id, body) {
        return await this.asignacionContenidoService.update(id, body);
    }
    async updateContenidos(idgrupo, idasignacion) {
        return await this.asignacionContenidoService.updateContenidos(idgrupo, idasignacion);
    }
    async delete(id) {
        return await this.asignacionContenidoService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./asignacion-contenido.entity").AsignacionContenidoEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AsignacionContenidoController.prototype, "findAll", null);
__decorate([
    common_1.Get('idgrupo/:id'),
    openapi.ApiResponse({ status: 200, type: [require("./asignacion-contenido.entity").AsignacionContenidoEntity] }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AsignacionContenidoController.prototype, "findbyidgrupo", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./asignacion-contenido.entity").AsignacionContenidoEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AsignacionContenidoController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [asignacion_contenido_entity_1.AsignacionContenidoEntity]),
    __metadata("design:returntype", Promise)
], AsignacionContenidoController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, asignacion_contenido_entity_1.AsignacionContenidoEntity]),
    __metadata("design:returntype", Promise)
], AsignacionContenidoController.prototype, "update", null);
__decorate([
    common_1.Put('/:idgrupo/:idasignacion'),
    openapi.ApiResponse({ status: 200, type: [require("./asignacion-contenido.entity").AsignacionContenidoEntity] }),
    __param(0, common_1.Param('idgrupo')), __param(1, common_1.Param('idasignacion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AsignacionContenidoController.prototype, "updateContenidos", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AsignacionContenidoController.prototype, "delete", null);
AsignacionContenidoController = __decorate([
    swagger_1.ApiTags('asignacion-contenido'),
    common_1.Controller('asignacion-contenido'),
    __metadata("design:paramtypes", [asignacion_contenido_service_1.AsignacionContenidoService])
], AsignacionContenidoController);
exports.AsignacionContenidoController = AsignacionContenidoController;
//# sourceMappingURL=asignacion-contenido.controller.js.map