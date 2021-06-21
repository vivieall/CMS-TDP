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
exports.MotorFacialController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const motor_facial_entity_1 = require("./motor-facial.entity");
const motor_facial_service_1 = require("./motor-facial.service");
let MotorFacialController = class MotorFacialController {
    constructor(motorFacialService) {
        this.motorFacialService = motorFacialService;
    }
    async findAll() {
        return this.motorFacialService.findAll();
    }
    async findOne(id) {
        return await this.motorFacialService.findOne(id);
    }
    async upload(body, files) {
        var _a;
        console.log(files, body);
        if (!files.file || !files.file[0])
            throw new common_1.HttpException('File needed', 500);
        if (body.id) {
            const newBody = JSON.parse(JSON.stringify(body));
            return await this.motorFacialService.uploadS3(newBody.id, files.file[0], newBody);
        }
        else {
            const newBody = JSON.parse(JSON.stringify(body));
            const res = await this.motorFacialService.add(body);
            if ((_a = res.identifiers[0]) === null || _a === void 0 ? void 0 : _a.id) {
                return await this.motorFacialService.uploadS3(res.identifiers[0].id, files.file[0].buffer);
            }
            throw new common_1.HttpException('Could not create object', 500);
        }
    }
    async add(body) {
        return await this.motorFacialService.add(body);
    }
    async update(id, body) {
        return this.motorFacialService.update(id, body);
    }
    async delete(id) {
        return this.motorFacialService.delete(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("./motor-facial.entity").MotorFacialEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MotorFacialController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    openapi.ApiResponse({ status: 200, type: require("./motor-facial.entity").MotorFacialEntity }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MotorFacialController.prototype, "findOne", null);
__decorate([
    common_1.Post('/upload'),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
        { name: 'file', maxCount: 1 },
    ])),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [motor_facial_entity_1.MotorFacialEntity, Object]),
    __metadata("design:returntype", Promise)
], MotorFacialController.prototype, "upload", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [motor_facial_entity_1.MotorFacialEntity]),
    __metadata("design:returntype", Promise)
], MotorFacialController.prototype, "add", null);
__decorate([
    common_1.Put('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, motor_facial_entity_1.MotorFacialEntity]),
    __metadata("design:returntype", Promise)
], MotorFacialController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MotorFacialController.prototype, "delete", null);
MotorFacialController = __decorate([
    swagger_1.ApiTags('motor-facial'),
    common_1.Controller('ofertas'),
    __metadata("design:paramtypes", [motor_facial_service_1.MotorFacialService])
], MotorFacialController);
exports.MotorFacialController = MotorFacialController;
//# sourceMappingURL=motor-facial.controller.js.map