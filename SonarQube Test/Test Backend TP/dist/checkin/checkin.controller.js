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
exports.CheckinController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const checkin_entity_1 = require("./checkin.entity");
const checkin_service_1 = require("./checkin.service");
const swagger_1 = require("@nestjs/swagger");
let CheckinController = class CheckinController {
    constructor(checkinService) {
        this.checkinService = checkinService;
    }
    async findAll() {
        return this.checkinService.findAll();
    }
    async findOne(id) {
        return await this.checkinService.findOne(id);
    }
    async add(body) {
        return await this.checkinService.add(body);
    }
    async update(id, body) {
        return this.checkinService.update(id, body);
    }
    async delete(id) {
        return this.checkinService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./checkin.entity").CheckinEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CheckinController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./checkin.entity").CheckinEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckinController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkin_entity_1.CheckinEntity]),
    __metadata("design:returntype", Promise)
], CheckinController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, checkin_entity_1.CheckinEntity]),
    __metadata("design:returntype", Promise)
], CheckinController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckinController.prototype, "delete", null);
CheckinController = __decorate([
    swagger_1.ApiTags('checkin'),
    common_1.Controller('checkin'),
    __metadata("design:paramtypes", [checkin_service_1.CheckinService])
], CheckinController);
exports.CheckinController = CheckinController;
//# sourceMappingURL=checkin.controller.js.map