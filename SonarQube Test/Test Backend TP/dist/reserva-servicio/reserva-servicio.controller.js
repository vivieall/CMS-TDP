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
exports.ReservaServicioController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reserva_servicio_entity_1 = require("./reserva-servicio.entity");
const reserva_servicio_service_1 = require("./reserva-servicio.service");
let ReservaServicioController = class ReservaServicioController {
    constructor(reservaservicioService) {
        this.reservaservicioService = reservaservicioService;
    }
    async findAll() {
        return this.reservaservicioService.findAll();
    }
    async findOne(id) {
        return await this.reservaservicioService.findOne(id);
    }
    async add(body) {
        return await this.reservaservicioService.add(body);
    }
    async update(id, body) {
        return this.reservaservicioService.update(id, body);
    }
    async delete(id) {
        return this.reservaservicioService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./reserva-servicio.entity").ReservaServicioEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservaServicioController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./reserva-servicio.entity").ReservaServicioEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservaServicioController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reserva_servicio_entity_1.ReservaServicioEntity]),
    __metadata("design:returntype", Promise)
], ReservaServicioController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reserva_servicio_entity_1.ReservaServicioEntity]),
    __metadata("design:returntype", Promise)
], ReservaServicioController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservaServicioController.prototype, "delete", null);
ReservaServicioController = __decorate([
    swagger_1.ApiTags('reserva-servicio'),
    common_1.Controller('reserva-servicio'),
    __metadata("design:paramtypes", [reserva_servicio_service_1.ReservaServicioService])
], ReservaServicioController);
exports.ReservaServicioController = ReservaServicioController;
//# sourceMappingURL=reserva-servicio.controller.js.map