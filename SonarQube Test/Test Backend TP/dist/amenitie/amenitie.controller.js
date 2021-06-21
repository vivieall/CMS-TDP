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
exports.AmenitieController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const amenitie_entity_1 = require("./amenitie.entity");
const amenitie_service_1 = require("./amenitie.service");
const swagger_1 = require("@nestjs/swagger");
let AmenitieController = class AmenitieController {
    constructor(amenitieService) {
        this.amenitieService = amenitieService;
    }
    async findAll(climate) {
        console.log(climate);
        return this.amenitieService.findAll(climate);
    }
    async findOne(id, climate) {
        return await this.amenitieService.findOne(id, climate);
    }
    async findOneByType(id) {
        return await this.amenitieService.findOneByType(id);
    }
    async add(body) {
        return await this.amenitieService.add(body);
    }
    async update(id, body) {
        return this.amenitieService.update(id, body);
    }
    async delete(id) {
        return this.amenitieService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiQuery({ 'name': 'climate', 'required': false, example: 'yes' }),
    openapi.ApiResponse({ status: 200, type: [require("./amenitie.entity").AmenitieEntity] }),
    __param(0, common_1.Query('climate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AmenitieController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    swagger_1.ApiQuery({ 'name': 'climate', 'required': false, example: 'yes' }),
    openapi.ApiResponse({ status: 200, type: require("./amenitie.entity").AmenitieEntity }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('climate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AmenitieController.prototype, "findOne", null);
__decorate([
    common_1.Get('/tipo-amenitie/:id'),
    openapi.ApiResponse({ status: 200, type: [require("./amenitie.entity").AmenitieEntity] }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AmenitieController.prototype, "findOneByType", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [amenitie_entity_1.AmenitieEntity]),
    __metadata("design:returntype", Promise)
], AmenitieController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, amenitie_entity_1.AmenitieEntity]),
    __metadata("design:returntype", Promise)
], AmenitieController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AmenitieController.prototype, "delete", null);
AmenitieController = __decorate([
    swagger_1.ApiTags('amenitie'),
    common_1.Controller('amenitie'),
    __metadata("design:paramtypes", [amenitie_service_1.AmenitieService])
], AmenitieController);
exports.AmenitieController = AmenitieController;
//# sourceMappingURL=amenitie.controller.js.map