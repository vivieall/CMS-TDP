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
exports.ServicioController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const servicio_service_1 = require("./servicio.service");
const servicio_entity_1 = require("./servicio.entity");
const swagger_1 = require("@nestjs/swagger");
let ServicioController = class ServicioController {
    constructor(servicioService) {
        this.servicioService = servicioService;
    }
    async findAll(id) {
        return await this.servicioService.findIdTipoServicio(id);
    }
    async findOne(id) {
        return await this.servicioService.findOne(id);
    }
    async add(body) {
        return await this.servicioService.add(body);
    }
    async update(id, body) {
        return await this.servicioService.update(id, body);
    }
    async delete(id) {
        return await this.servicioService.delete(id);
    }
};
__decorate([
    common_1.Get('/idtiposervicio/:id'),
    openapi.ApiResponse({ status: 200, type: [require("./servicio.entity").ServicioEntity] }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicioController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./servicio.entity").ServicioEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicioController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [servicio_entity_1.ServicioEntity]),
    __metadata("design:returntype", Promise)
], ServicioController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, servicio_entity_1.ServicioEntity]),
    __metadata("design:returntype", Promise)
], ServicioController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicioController.prototype, "delete", null);
ServicioController = __decorate([
    swagger_1.ApiTags('servicio'),
    common_1.Controller('servicio'),
    __metadata("design:paramtypes", [servicio_service_1.ServicioService])
], ServicioController);
exports.ServicioController = ServicioController;
//# sourceMappingURL=servicio.controller.js.map