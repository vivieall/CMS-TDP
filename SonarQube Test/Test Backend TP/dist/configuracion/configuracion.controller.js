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
exports.ConfiguracionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const configuracion_entity_1 = require("./configuracion.entity");
const configuracion_service_1 = require("./configuracion.service");
let ConfiguracionController = class ConfiguracionController {
    constructor(configuracionService) {
        this.configuracionService = configuracionService;
    }
    async findAll() {
        return this.configuracionService.findAll();
    }
    async findOne(id) {
        return await this.configuracionService.findOne(id);
    }
    async findTipo(id) {
        return await this.configuracionService.findIdTipoConfiguracion(id);
    }
    async add(body) {
        return await this.configuracionService.add(body);
    }
    async update(id, body) {
        return this.configuracionService.update(id, body);
    }
    async delete(id) {
        return this.configuracionService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./configuracion.entity").ConfiguracionEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfiguracionController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./configuracion.entity").ConfiguracionEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConfiguracionController.prototype, "findOne", null);
__decorate([
    common_1.Get('/tipoconfiguracion/:id'),
    openapi.ApiResponse({ status: 200, type: [require("./configuracion.entity").ConfiguracionEntity] }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConfiguracionController.prototype, "findTipo", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [configuracion_entity_1.ConfiguracionEntity]),
    __metadata("design:returntype", Promise)
], ConfiguracionController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, configuracion_entity_1.ConfiguracionEntity]),
    __metadata("design:returntype", Promise)
], ConfiguracionController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConfiguracionController.prototype, "delete", null);
ConfiguracionController = __decorate([
    swagger_1.ApiTags('configuracion'),
    common_1.Controller('configuracion'),
    __metadata("design:paramtypes", [configuracion_service_1.ConfiguracionService])
], ConfiguracionController);
exports.ConfiguracionController = ConfiguracionController;
//# sourceMappingURL=configuracion.controller.js.map