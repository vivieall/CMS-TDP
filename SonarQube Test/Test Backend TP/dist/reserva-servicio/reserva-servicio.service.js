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
exports.ReservaServicioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const reserva_servicio_entity_1 = require("./reserva-servicio.entity");
let ReservaServicioService = class ReservaServicioService {
    constructor(grupocontenidosRepository) {
        this.grupocontenidosRepository = grupocontenidosRepository;
    }
    async findAll() {
        return this.grupocontenidosRepository.find({ relations: ["huesped"] });
    }
    async findOne(id) {
        return this.grupocontenidosRepository.findOne(id, { relations: ["huesped"] });
    }
    async add(body) {
        body.id = uuid_1.v4();
        return this.grupocontenidosRepository.insert(body);
    }
    async update(id, body) {
        delete body.id;
        return this.grupocontenidosRepository.update({ id: id }, body);
    }
    async delete(id) {
        return this.grupocontenidosRepository.delete({ id: id });
    }
};
ReservaServicioService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(reserva_servicio_entity_1.ReservaServicioEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReservaServicioService);
exports.ReservaServicioService = ReservaServicioService;
//# sourceMappingURL=reserva-servicio.service.js.map