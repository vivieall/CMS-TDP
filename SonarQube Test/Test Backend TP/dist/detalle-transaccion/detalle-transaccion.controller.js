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
exports.DetalleTransaccionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const detalle_transaccion_entity_1 = require("./detalle-transaccion.entity");
const detalle_transaccion_service_1 = require("./detalle-transaccion.service");
const swagger_1 = require("@nestjs/swagger");
let DetalleTransaccionController = class DetalleTransaccionController {
    constructor(detalletransaccionService) {
        this.detalletransaccionService = detalletransaccionService;
    }
    async findAll() {
        return this.detalletransaccionService.findAll();
    }
    async findOne(id) {
        return await this.detalletransaccionService.findOne(id);
    }
    async findByVentaId(id) {
        return await this.detalletransaccionService.findByVentaId(id);
    }
    async add(body) {
        return await this.detalletransaccionService.add(body);
    }
    async update(id, body) {
        return this.detalletransaccionService.update(id, body);
    }
    async delete(id) {
        return this.detalletransaccionService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./detalle-transaccion.entity").DetalleTransaccionEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DetalleTransaccionController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./detalle-transaccion.entity").DetalleTransaccionEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DetalleTransaccionController.prototype, "findOne", null);
__decorate([
    common_1.Get('/venta/:id'),
    openapi.ApiResponse({ status: 200, type: [require("./detalle-transaccion.entity").DetalleTransaccionEntity] }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DetalleTransaccionController.prototype, "findByVentaId", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [detalle_transaccion_entity_1.DetalleTransaccionEntity]),
    __metadata("design:returntype", Promise)
], DetalleTransaccionController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, detalle_transaccion_entity_1.DetalleTransaccionEntity]),
    __metadata("design:returntype", Promise)
], DetalleTransaccionController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DetalleTransaccionController.prototype, "delete", null);
DetalleTransaccionController = __decorate([
    swagger_1.ApiTags('detalle-transaccion'),
    common_1.Controller('detalletransaccion'),
    __metadata("design:paramtypes", [detalle_transaccion_service_1.DetalleTransaccionService])
], DetalleTransaccionController);
exports.DetalleTransaccionController = DetalleTransaccionController;
//# sourceMappingURL=detalle-transaccion.controller.js.map