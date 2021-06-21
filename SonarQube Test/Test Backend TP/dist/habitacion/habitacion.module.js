"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitacionModule = void 0;
const common_1 = require("@nestjs/common");
const habitacion_service_1 = require("./habitacion.service");
const habitacion_controller_1 = require("./habitacion.controller");
const typeorm_1 = require("@nestjs/typeorm");
const habitacion_entity_1 = require("./habitacion.entity");
let HabitacionModule = class HabitacionModule {
};
HabitacionModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([habitacion_entity_1.HabitacionEntity])],
        providers: [habitacion_service_1.HabitacionService],
        controllers: [habitacion_controller_1.HabitacionController],
        exports: [habitacion_service_1.HabitacionService]
    })
], HabitacionModule);
exports.HabitacionModule = HabitacionModule;
//# sourceMappingURL=habitacion.module.js.map