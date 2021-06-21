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
exports.AmenitieService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const amenitie_entity_1 = require("./amenitie.entity");
const uuid_1 = require("uuid");
let AmenitieService = class AmenitieService {
    constructor(amenitieRepository, httpService) {
        this.amenitieRepository = amenitieRepository;
        this.httpService = httpService;
        this.weatherApiKey = process.env.WEATHER_KEY;
    }
    async findAll(climate = undefined) {
        const DBresponse = await this.amenitieRepository.find({ relations: ["tipoAmenitie"] });
        console.log(climate);
        if (climate) {
            for (let i = 0; i < DBresponse.length; i++) {
                const weatherResponse = await this.httpService.get(`http://api.openweathermap.org/data/2.5/weather?q=${DBresponse[i].clima}&units=metric&appid=${this.weatherApiKey}`).toPromise();
                DBresponse[i].climaData = weatherResponse.data;
            }
        }
        return DBresponse;
    }
    async findOne(id, climate = undefined) {
        const DBresponse = await this.amenitieRepository.findOne(id, { relations: ["tipoAmenitie"] });
        if (climate) {
            const weatherResponse = await this.httpService.get(`http://api.openweathermap.org/data/2.5/weather?q=${DBresponse.clima}&units=metric&appid=${this.weatherApiKey}`).toPromise();
            DBresponse.climaData = weatherResponse.data;
        }
        return DBresponse;
    }
    async findOneByType(tipoAmenitieID) {
        return this.amenitieRepository.find({ where: { tipoAmenitie: tipoAmenitieID }, relations: ["tipoAmenitie"] });
    }
    async add(body) {
        body.id = uuid_1.v4();
        return this.amenitieRepository.insert(body);
    }
    async update(id, body) {
        delete body.id;
        return this.amenitieRepository.update({ id: id }, body);
    }
    async delete(id) {
        return this.amenitieRepository.delete({ id: id });
    }
};
AmenitieService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(amenitie_entity_1.AmenitieEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.HttpService])
], AmenitieService);
exports.AmenitieService = AmenitieService;
//# sourceMappingURL=amenitie.service.js.map