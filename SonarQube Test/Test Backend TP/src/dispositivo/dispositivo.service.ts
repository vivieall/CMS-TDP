import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { builtinModules } from 'module';
import { Repository } from 'typeorm';
import { DispositivoEntity } from './dispositivo.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DispositivoService {
    constructor(
        @InjectRepository(DispositivoEntity)
        private dispositivoRepository: Repository<DispositivoEntity>
    ){}
    async findAll(){
        return this.dispositivoRepository.find({relations:["asignacioncontenido"]});
    }
    async findOne(id) {
        return this.dispositivoRepository.findOne(id,{relations: ["asignacioncontenido"]});
    }
    async add(body){
        body.id=uuidv4();
        return this.dispositivoRepository.insert(body);
    }
    async update(id,body){
        body.id=id;
        return this.dispositivoRepository.update({id:id},body);
    }
    async delete(id){
        return this.dispositivoRepository.delete({id:id});
    }
}
