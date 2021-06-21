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
exports.DetalleTransaccionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const detalle_transaccion_entity_1 = require("./detalle-transaccion.entity");
const uuid_1 = require("uuid");
let DetalleTransaccionService = class DetalleTransaccionService {
    constructor(detalletransaccionRepository) {
        this.detalletransaccionRepository = detalletransaccionRepository;
    }
    async findAll() {
        return this.detalletransaccionRepository.find({ relations: ["itemTransaccion"] });
    }
    async findOne(id) {
        return this.detalletransaccionRepository.findOne(id, { relations: ["itemTransaccion"] });
    }
    async findByVentaId(id) {
        return this.detalletransaccionRepository.find({ relations: ["itemTransaccion"], where: { venta: id } });
    }
    async add(body) {
        body.id = uuid_1.v4();
        return this.detalletransaccionRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.detalletransaccionRepository.update({ id: id }, body);
    }
    async delete(id) {
        return this.detalletransaccionRepository.delete({ id: id });
    }
};
DetalleTransaccionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(detalle_transaccion_entity_1.DetalleTransaccionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DetalleTransaccionService);
exports.DetalleTransaccionService = DetalleTransaccionService;
//# sourceMappingURL=detalle-transaccion.service.js.map