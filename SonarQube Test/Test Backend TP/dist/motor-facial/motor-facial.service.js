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
exports.MotorFacialService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const motor_facial_entity_1 = require("./motor-facial.entity");
const uuid_1 = require("uuid");
const AWS = require("aws-sdk");
let MotorFacialService = class MotorFacialService {
    constructor(motorFacialRepository) {
        this.motorFacialRepository = motorFacialRepository;
        this.S3Service = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }
    async findAll() {
        return this.motorFacialRepository.find();
    }
    async findOne(id) {
        return this.motorFacialRepository.findOne(id);
    }
    async add(body) {
        body.id = uuid_1.v4();
        return this.motorFacialRepository.insert(body);
    }
    async update(id, body) {
        delete body.id;
        return this.motorFacialRepository.update({ id: id }, body);
    }
    async delete(id) {
        const DBResponse = await this.findOne(id);
        if (DBResponse) {
            await this.S3Service.deleteObject({ Bucket: 'tp-bucket20202-facial', Key: DBResponse.s3Key }).promise();
            return this.motorFacialRepository.delete({ id: id });
        }
        else
            throw new common_1.HttpException('Error: not found', 404);
    }
    async uploadS3(id, buffer, obj = undefined) {
        const filename = uuid_1.v4() + '.jpg';
        const awsResponse = await this.S3Service.putObject({
            Bucket: 'tp-bucket20202-facial',
            Key: filename,
            Body: Buffer.from(buffer),
            ACL: "public-read",
            ContentType: 'image/jpeg'
        }).promise();
        const url = "https://tp-bucket20202-facial.s3.us-east-2.amazonaws.com" + filename;
        const objToUpdate = {
            url_imagen: url,
            s3Key: filename
        };
        if (obj) {
            if (obj.titulo)
                objToUpdate.titulo = obj.titulo;
            if (obj.descripcion)
                objToUpdate.descripcion = obj.descripcion;
            if (obj.itemfacial)
                objToUpdate.itemfacial = obj.itemfacial;
        }
        console.log("update?", objToUpdate);
        await this.update(id, objToUpdate);
        return { url: url, id: id };
    }
};
MotorFacialService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(motor_facial_entity_1.MotorFacialEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MotorFacialService);
exports.MotorFacialService = MotorFacialService;
//# sourceMappingURL=motor-facial.service.js.map