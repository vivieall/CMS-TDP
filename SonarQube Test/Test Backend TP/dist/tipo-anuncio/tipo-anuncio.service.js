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
exports.TipoAnuncioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tipo_anuncio_entity_1 = require("./tipo-anuncio.entity");
const uuid_1 = require("uuid");
let TipoAnuncioService = class TipoAnuncioService {
    constructor(tipoanunciosRepository) {
        this.tipoanunciosRepository = tipoanunciosRepository;
    }
    async findAll() {
        return this.tipoanunciosRepository.find({ relations: ["anuncio"] });
    }
    async findOne(id) {
        return this.tipoanunciosRepository.findOne(id, { relations: ["anuncio"] });
    }
    async add(body) {
        body.id = uuid_1.v4();
        return this.tipoanunciosRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.tipoanunciosRepository.update({ id: id }, body);
    }
    async delete(id) {
        return this.tipoanunciosRepository.delete({ id: id });
    }
};
TipoAnuncioService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(tipo_anuncio_entity_1.TipoAnuncioEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TipoAnuncioService);
exports.TipoAnuncioService = TipoAnuncioService;
//# sourceMappingURL=tipo-anuncio.service.js.map