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
exports.ItemTransaccionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const item_transaccion_entity_1 = require("./item-transaccion.entity");
const item_transaccion_service_1 = require("./item-transaccion.service");
const swagger_1 = require("@nestjs/swagger");
let ItemTransaccionController = class ItemTransaccionController {
    constructor(itemtransaccionService) {
        this.itemtransaccionService = itemtransaccionService;
    }
    async findAll() {
        return this.itemtransaccionService.findAll();
    }
    async findOne(id) {
        return await this.itemtransaccionService.findOne(id);
    }
    async findByTransaccionId(id) {
        return await this.itemtransaccionService.findByTransaccionId(id);
    }
    async add(body) {
        return await this.itemtransaccionService.add(body);
    }
    async update(id, body) {
        return this.itemtransaccionService.update(id, body);
    }
    async delete(id) {
        return this.itemtransaccionService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./item-transaccion.entity").ItemTransaccionEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemTransaccionController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./item-transaccion.entity").ItemTransaccionEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemTransaccionController.prototype, "findOne", null);
__decorate([
    common_1.Get('/transaccion/:id'),
    openapi.ApiResponse({ status: 200, type: [require("./item-transaccion.entity").ItemTransaccionEntity] }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemTransaccionController.prototype, "findByTransaccionId", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_transaccion_entity_1.ItemTransaccionEntity]),
    __metadata("design:returntype", Promise)
], ItemTransaccionController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_transaccion_entity_1.ItemTransaccionEntity]),
    __metadata("design:returntype", Promise)
], ItemTransaccionController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemTransaccionController.prototype, "delete", null);
ItemTransaccionController = __decorate([
    swagger_1.ApiTags('item-transaccion'),
    common_1.Controller('item-transaccion'),
    __metadata("design:paramtypes", [item_transaccion_service_1.ItemTransaccionService])
], ItemTransaccionController);
exports.ItemTransaccionController = ItemTransaccionController;
//# sourceMappingURL=item-transaccion.controller.js.map