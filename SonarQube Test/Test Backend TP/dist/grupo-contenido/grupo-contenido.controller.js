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
exports.GrupoContenidoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const grupo_contenido_service_1 = require("./grupo-contenido.service");
const grupo_contenido_entity_1 = require("./grupo-contenido.entity");
const swagger_1 = require("@nestjs/swagger");
let GrupoContenidoController = class GrupoContenidoController {
    constructor(grupocontenidoService) {
        this.grupocontenidoService = grupocontenidoService;
    }
    async findAll() {
        return this.grupocontenidoService.findAll();
    }
    async findOne(id) {
        return await this.grupocontenidoService.findOne(id);
    }
    async add(body) {
        return await this.grupocontenidoService.add(body);
    }
    async update(id, body) {
        return this.grupocontenidoService.update(id, body);
    }
    async delete(id) {
        return this.grupocontenidoService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./grupo-contenido.entity").GrupoContenidoEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GrupoContenidoController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./grupo-contenido.entity").GrupoContenidoEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GrupoContenidoController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [grupo_contenido_entity_1.GrupoContenidoEntity]),
    __metadata("design:returntype", Promise)
], GrupoContenidoController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, grupo_contenido_entity_1.GrupoContenidoEntity]),
    __metadata("design:returntype", Promise)
], GrupoContenidoController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GrupoContenidoController.prototype, "delete", null);
GrupoContenidoController = __decorate([
    swagger_1.ApiTags('grupo-contenido'),
    common_1.Controller('grupo-contenido'),
    __metadata("design:paramtypes", [grupo_contenido_service_1.GrupoContenidoService])
], GrupoContenidoController);
exports.GrupoContenidoController = GrupoContenidoController;
//# sourceMappingURL=grupo-contenido.controller.js.map