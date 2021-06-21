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
exports.AnuncioController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const anuncio_entity_1 = require("./anuncio.entity");
const anuncio_service_1 = require("./anuncio.service");
let AnuncioController = class AnuncioController {
    constructor(anuncioService) {
        this.anuncioService = anuncioService;
    }
    async findAll() {
        return this.anuncioService.findAll();
    }
    async findBytipoId(id) {
        return await this.anuncioService.findByTipoId(id);
    }
    async findOne(id) {
        return await this.anuncioService.findOne(id);
    }
    async add(body) {
        return await this.anuncioService.add(body);
    }
    async update(id, body) {
        return this.anuncioService.update(id, body);
    }
    async delete(id) {
        return this.anuncioService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./anuncio.entity").AnuncioEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnuncioController.prototype, "findAll", null);
__decorate([
    common_1.Get('/tipoid/:id'),
    openapi.ApiResponse({ status: 200, type: [require("./anuncio.entity").AnuncioEntity] }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnuncioController.prototype, "findBytipoId", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./anuncio.entity").AnuncioEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnuncioController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anuncio_entity_1.AnuncioEntity]),
    __metadata("design:returntype", Promise)
], AnuncioController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, anuncio_entity_1.AnuncioEntity]),
    __metadata("design:returntype", Promise)
], AnuncioController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnuncioController.prototype, "delete", null);
AnuncioController = __decorate([
    swagger_1.ApiTags('anuncio'),
    common_1.Controller('anuncio'),
    __metadata("design:paramtypes", [anuncio_service_1.AnuncioService])
], AnuncioController);
exports.AnuncioController = AnuncioController;
//# sourceMappingURL=anuncio.controller.js.map