import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministradorEntity } from './administrador.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(AdministradorEntity)
        private administradorsRepository: Repository<AdministradorEntity>,
    ) { }
    async findAll() {
        return this.administradorsRepository.find();

    }
    async findOne(id) {
        return this.administradorsRepository.findOne(id);
    }
    async add(body: AdministradorEntity) {
        body.id = uuidv4(); 
        return this.administradorsRepository.insert(body)
    }
    async login(body: AdministradorEntity) {
        const admin = await this.administradorsRepository.findOne({where:{email:body.email}})
        if (admin && admin.password == body.password) {
            return {
                status: 201,
                respuesta: 'Credenciales Correctas'
            }
        }
        else{
            throw new HttpException({
                status: 401,
                respuesta: 'Datos Incorrectos'
            },401)
        }
       
    }
    async update(id, body) {
        delete body.id
        return this.administradorsRepository.update({id:id},body)
    }
    async delete(id) {
        return this.administradorsRepository.delete({id:id})
    }

}
