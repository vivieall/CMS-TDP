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
exports.ItemTransaccionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_transaccion_entity_1 = require("./item-transaccion.entity");
const uuid_1 = require("uuid");
let ItemTransaccionService = class ItemTransaccionService {
    constructor(itemtransaccionRepository) {
        this.itemtransaccionRepository = itemtransaccionRepository;
    }
    async findAll() {
        return this.itemtransaccionRepository.find();
    }
    async findOne(id) {
        return this.itemtransaccionRepository.findOne(id);
    }
    async findByTransaccionId(id) {
        return this.itemtransaccionRepository.find({ where: { transaccion: id } });
    }
    async add(body) {
        body.id = uuid_1.v4();
        return this.itemtransaccionRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.itemtransaccionRepository.update({ id: id }, body);
    }
    async delete(id) {
        return this.itemtransaccionRepository.delete({ id: id });
    }
};
ItemTransaccionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(item_transaccion_entity_1.ItemTransaccionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ItemTransaccionService);
exports.ItemTransaccionService = ItemTransaccionService;
//# sourceMappingURL=item-transaccion.service.js.map