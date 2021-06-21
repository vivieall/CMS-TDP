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
exports.DispositivoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dispositivo_entity_1 = require("./dispositivo.entity");
const dispositivo_service_1 = require("./dispositivo.service");
let DispositivoController = class DispositivoController {
    constructor(dispositivoService) {
        this.dispositivoService = dispositivoService;
    }
    async findAll() {
        return await this.dispositivoService.findAll();
    }
    async findOne(id) {
        return await this.dispositivoService.findOne(id);
    }
    async add(body) {
        return await this.dispositivoService.add(body);
    }
    async update(id, body) {
        return await this.dispositivoService.update(id, body);
    }
    async delete(id) {
        return await this.dispositivoService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./dispositivo.entity").DispositivoEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DispositivoController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./dispositivo.entity").DispositivoEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DispositivoController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dispositivo_entity_1.DispositivoEntity]),
    __metadata("design:returntype", Promise)
], DispositivoController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dispositivo_entity_1.DispositivoEntity]),
    __metadata("design:returntype", Promise)
], DispositivoController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DispositivoController.prototype, "delete", null);
DispositivoController = __decorate([
    swagger_1.ApiTags('dispositivo'),
    common_1.Controller('dispositivo'),
    __metadata("design:paramtypes", [dispositivo_service_1.DispositivoService])
], DispositivoController);
exports.DispositivoController = DispositivoController;
//# sourceMappingURL=dispositivo.controller.js.map