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
exports.HabitacionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const habitacion_entity_1 = require("./habitacion.entity");
const habitacion_service_1 = require("./habitacion.service");
const swagger_1 = require("@nestjs/swagger");
let HabitacionController = class HabitacionController {
    constructor(habitacionService) {
        this.habitacionService = habitacionService;
    }
    async findAll(active) {
        if (active == undefined || active == null)
            active = true;
        return this.habitacionService.findAll(active);
    }
    async findOne(id, active) {
        if (active == undefined || active == null)
            active = true;
        return await this.habitacionService.findOne(id, active);
    }
    async add(body) {
        return await this.habitacionService.add(body);
    }
    async update(id, body) {
        return this.habitacionService.update(id, body);
    }
    async delete(id) {
        return this.habitacionService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./habitacion.entity").HabitacionEntity] }),
    __param(0, common_1.Query('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], HabitacionController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./habitacion.entity").HabitacionEntity }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], HabitacionController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [habitacion_entity_1.HabitacionEntity]),
    __metadata("design:returntype", Promise)
], HabitacionController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, habitacion_entity_1.HabitacionEntity]),
    __metadata("design:returntype", Promise)
], HabitacionController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HabitacionController.prototype, "delete", null);
HabitacionController = __decorate([
    swagger_1.ApiTags('habitacion'),
    common_1.Controller('habitacion'),
    __metadata("design:paramtypes", [habitacion_service_1.HabitacionService])
], HabitacionController);
exports.HabitacionController = HabitacionController;
//# sourceMappingURL=habitacion.controller.js.map