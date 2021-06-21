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
exports.AdministradorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const administrador_entity_1 = require("./administrador.entity");
const uuid_1 = require("uuid");
let AdministradorService = class AdministradorService {
    constructor(administradorsRepository) {
        this.administradorsRepository = administradorsRepository;
    }
    async findAll() {
        return this.administradorsRepository.find();
    }
    async findOne(id) {
        return this.administradorsRepository.findOne(id);
    }
    async add(body) {
        body.id = uuid_1.v4();
        return this.administradorsRepository.insert(body);
    }
    async login(body) {
        const admin = await this.administradorsRepository.findOne({ where: { email: body.email } });
        if (admin && admin.password == body.password) {
            return {
                status: 201,
                respuesta: 'Credenciales Correctas'
            };
        }
        else {
            throw new common_1.HttpException({
                status: 401,
                respuesta: 'Datos Incorrectos'
            }, 401);
        }
    }
    async update(id, body) {
        delete body.id;
        return this.administradorsRepository.update({ id: id }, body);
    }
    async delete(id) {
        return this.administradorsRepository.delete({ id: id });
    }
};
AdministradorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(administrador_entity_1.AdministradorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdministradorService);
exports.AdministradorService = AdministradorService;
//# sourceMappingURL=administrador.service.js.map