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
exports.AdministradorController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const administrador_service_1 = require("./administrador.service");
const administrador_entity_1 = require("./administrador.entity");
const swagger_1 = require("@nestjs/swagger");
let AdministradorController = class AdministradorController {
    constructor(administradorService) {
        this.administradorService = administradorService;
    }
    async findAll() {
        const service = await this.administradorService.findAll();
        for (let i = 0; i < service.length; i++) {
            service[i].password = undefined;
        }
        return service;
    }
    async findOne(id) {
        const findOne = await this.administradorService.findOne(id);
        findOne.password = undefined;
        return findOne;
    }
    async add(body) {
        return await this.administradorService.add(body);
    }
    async login(body) {
        return await this.administradorService.login(body);
    }
    async update(id, body) {
        return await this.administradorService.update(id, body);
    }
    async delete(id) {
        return await this.administradorService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./administrador.entity").AdministradorEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdministradorController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./administrador.entity").AdministradorEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdministradorController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [administrador_entity_1.AdministradorEntity]),
    __metadata("design:returntype", Promise)
], AdministradorController.prototype, "add", null);
__decorate([
    common_1.Post('/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [administrador_entity_1.AdministradorEntity]),
    __metadata("design:returntype", Promise)
], AdministradorController.prototype, "login", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, administrador_entity_1.AdministradorEntity]),
    __metadata("design:returntype", Promise)
], AdministradorController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdministradorController.prototype, "delete", null);
AdministradorController = __decorate([
    swagger_1.ApiTags('administrador'),
    common_1.Controller('administrador'),
    __metadata("design:paramtypes", [administrador_service_1.AdministradorService])
], AdministradorController);
exports.AdministradorController = AdministradorController;
//# sourceMappingURL=administrador.controller.js.map