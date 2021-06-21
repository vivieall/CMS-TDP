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
exports.VentaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const venta_entity_1 = require("./venta.entity");
const venta_service_1 = require("./venta.service");
const swagger_1 = require("@nestjs/swagger");
let VentaController = class VentaController {
    constructor(ventaService) {
        this.ventaService = ventaService;
    }
    async findAll() {
        return this.ventaService.findAll();
    }
    async findOne(id, huesped) {
        if (huesped)
            return await this.ventaService.findOneWithHuesped(id);
        return await this.ventaService.findOne(id);
    }
    async findOneByTransaccion(id) {
        return await this.ventaService.findOneByTransaccion(id);
    }
    async add(body) {
        return await this.ventaService.add(body);
    }
    async update(id, body) {
        return this.ventaService.update(id, body);
    }
    async delete(id) {
        return this.ventaService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./venta.entity").VentaEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./venta.entity").VentaEntity }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('huesped')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "findOne", null);
__decorate([
    common_1.Get('transaccion/:id'),
    openapi.ApiResponse({ status: 200, type: [require("./venta.entity").VentaEntity] }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "findOneByTransaccion", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [venta_entity_1.VentaEntity]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, venta_entity_1.VentaEntity]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VentaController.prototype, "delete", null);
VentaController = __decorate([
    swagger_1.ApiTags('venta'),
    common_1.Controller('venta'),
    __metadata("design:paramtypes", [venta_service_1.VentaService])
], VentaController);
exports.VentaController = VentaController;
//# sourceMappingURL=venta.controller.js.map