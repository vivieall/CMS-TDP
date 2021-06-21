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
exports.AsignacionContenidoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const asignacion_service_1 = require("../asignacion/asignacion.service");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const asignacion_contenido_entity_1 = require("./asignacion-contenido.entity");
let AsignacionContenidoService = class AsignacionContenidoService {
    constructor(asignacionContenidoRepository, asignacionService) {
        this.asignacionContenidoRepository = asignacionContenidoRepository;
        this.asignacionService = asignacionService;
    }
    async findAllTipo() {
        return this.asignacionContenidoRepository.find({ relations: ["contenido", "grupocontenido", "asignacion"] });
    }
    async findByIdGrupo(id) {
        return this.asignacionContenidoRepository.find({ where: { grupocontenido: id }, relations: ["contenido", "grupocontenido", "asignacion"] });
    }
    async findOne(id) {
        return this.asignacionContenidoRepository.findOne(id, { relations: ["contenido", "grupocontenido", "asignacion"] });
    }
    async add(body) {
        body.id = uuid_1.v4();
        return this.asignacionContenidoRepository.insert(body);
    }
    async update(id, body) {
        body.id = id;
        return this.asignacionContenidoRepository.update({ id: id }, body);
    }
    async delete(id) {
        return this.asignacionContenidoRepository.delete({ id: id });
    }
    async updateContenidos(idgrupo, idasignacion) {
        let all = await this.findByIdGrupo(idgrupo);
        let asignacion = await this.asignacionService.findOne(idasignacion);
        var json = { 'id': asignacion.id };
        var asignacionjson = JSON.parse(JSON.stringify(json));
        all.forEach(element => {
            element.asignacion = asignacionjson;
            this.update(element.id, element);
        });
        return all;
    }
};
AsignacionContenidoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(asignacion_contenido_entity_1.AsignacionContenidoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        asignacion_service_1.AsignacionService])
], AsignacionContenidoService);
exports.AsignacionContenidoService = AsignacionContenidoService;
//# sourceMappingURL=asignacion-contenido.service.js.map