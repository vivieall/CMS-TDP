"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotorFacialModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const motor_facial_controller_1 = require("./motor-facial.controller");
const motor_facial_entity_1 = require("./motor-facial.entity");
const motor_facial_service_1 = require("./motor-facial.service");
let MotorFacialModule = class MotorFacialModule {
};
MotorFacialModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([motor_facial_entity_1.MotorFacialEntity])],
        providers: [motor_facial_service_1.MotorFacialService],
        controllers: [motor_facial_controller_1.MotorFacialController]
    })
], MotorFacialModule);
exports.MotorFacialModule = MotorFacialModule;
//# sourceMappingURL=motor-facial.module.js.map