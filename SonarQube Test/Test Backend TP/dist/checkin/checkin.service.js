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
exports.CheckinService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const checkin_entity_1 = require("./checkin.entity");
const uuid_1 = require("uuid");
const habitacion_service_1 = require("../habitacion/habitacion.service");
let CheckinService = class CheckinService {
    constructor(checkinRepository, habitacionService) {
        this.checkinRepository = checkinRepository;
        this.habitacionService = habitacionService;
    }
    async findAll() {
        return this.checkinRepository.find({ relations: ["venta", "huesped", "habitacion"] });
    }
    async findOne(id) {
        return this.checkinRepository.findOne(id, { relations: ["venta", "huesped", "habitacion"] });
    }
    async add(body) {
        body.id = uuid_1.v4();
        if (body.habitacion) {
            let updateHabitacion = {
                activo: false
            };
            this.habitacionService.update(body.habitacion, updateHabitacion);
        }
        return this.checkinRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        let antiguaHabitacion = JSON.parse(JSON.stringify(body)).antiguaHabitacion;
        delete body.antiguaHabitacion;
        if (antiguaHabitacion && body.habitacion) {
            let updateAntiguaHabitacion = {
                activo: true
            };
            this.habitacionService.update(antiguaHabitacion, updateAntiguaHabitacion);
            let updateHabitacion = {
                activo: false
            };
            this.habitacionService.update(body.habitacion, updateHabitacion);
        }
        return this.checkinRepository.update({ id: id }, body);
    }
    async delete(id) {
        let res = await this.findOne(id);
        if (res) {
            this.habitacionService.update(res.habitacion.id, {
                activo: true
            });
        }
        return this.checkinRepository.delete({ id: id });
    }
};
CheckinService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(checkin_entity_1.CheckinEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        habitacion_service_1.HabitacionService])
], CheckinService);
exports.CheckinService = CheckinService;
//# sourceMappingURL=checkin.service.js.map