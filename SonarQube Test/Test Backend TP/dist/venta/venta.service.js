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
exports.VentaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const venta_entity_1 = require("./venta.entity");
const uuid_1 = require("uuid");
const transaccion_entity_1 = require("../transaccion/transaccion.entity");
const checkin_service_1 = require("../checkin/checkin.service");
let VentaService = class VentaService {
    constructor(ventaRepository, checkinService) {
        this.ventaRepository = ventaRepository;
        this.checkinService = checkinService;
    }
    async findAll() {
        return this.ventaRepository.find({ "relations": ["detalleTransaccion", "checkin"] });
    }
    async findOne(id) {
        return this.ventaRepository.findOne(id, { "relations": ["detalleTransaccion", "checkin"] });
    }
    async findOneWithHuesped(id) {
        let res = await this.ventaRepository.findOne(id, { "relations": ["detalleTransaccion", "checkin"] });
        let checkin = await this.checkinService.findOne(res.checkin.id);
        res.checkin = checkin;
        return res;
    }
    async findOneByTransaccion(id) {
        return this.ventaRepository.find({ where: { transaccion: { id: id } } });
    }
    async add(body) {
        body.id = uuid_1.v4();
        return this.ventaRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.ventaRepository.update({ id: id }, body);
    }
    async delete(id) {
        return this.ventaRepository.delete({ id: id });
    }
};
VentaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(venta_entity_1.VentaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        checkin_service_1.CheckinService])
], VentaService);
exports.VentaService = VentaService;
//# sourceMappingURL=venta.service.js.map